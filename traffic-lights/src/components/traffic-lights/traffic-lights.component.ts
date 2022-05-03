import {
  ITrafficLights,
  IncrementValue,
  LastParams,
} from "./traffic-lights.types";
import { ILantern, LanternConfiguration } from "../lantern/lantern.types";
import { Lantern } from "../lantern/lantern.component";
import { SECOND } from "./traffic-lights.constants";
import { ITimer } from "../timer/timer.types";
import { Timer } from "../timer/timer.component";

export class TrafficLights implements ITrafficLights {
  private element: HTMLElement;
  private currentLanternIndex: number = 0;
  private lanterns: ILantern[];
  private timer: ITimer;
  private incrementer: IncrementValue = IncrementValue.Increment;

  constructor(element: HTMLElement, colors: LanternConfiguration[]) {
    this.element = element;
    this.changeColor = this.changeColor.bind(this);
    this.getNextLantern = this.getNextLantern.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.lanterns = colors.map(({ timing, color }) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("lantern");
      this.element.appendChild(newDiv);
      return new Lantern(
        color,
        timing * SECOND,
        newDiv,
        this.handleMouseEnter,
        this.handleMouseLeave
      );
    });
    this.timer = new Timer();
  }

  private getNextLantern(): ILantern {
    this.currentLanternIndex += this.incrementer;
    if (this.currentLanternIndex === this.lanterns.length - 1) {
      this.incrementer = IncrementValue.Decrement;
    } else if (
      this.currentLanternIndex === 0 &&
      this.incrementer === IncrementValue.Decrement
    ) {
      this.incrementer = IncrementValue.Increment;
    }

    return this.lanterns[this.currentLanternIndex];
  }

  changeColor(): void {
    const previousLantern = this.lanterns[this.currentLanternIndex];
    previousLantern.turnOnOff();

    const currentLantern = this.getNextLantern();

    currentLantern.turnOnOff();
    this.timer.start(currentLantern.timing, this.changeColor);
  }

  stop(): void {
    this.timer.pause();
  }

  resume(): void {
    this.timer.resume();
  }

  start(currentColor?: string, remaining?: number): void {
    if (currentColor) {
      const index = this.lanterns.findIndex(
        ({ color }) => currentColor === color
      );
      this.currentLanternIndex = index >= 0 ? index : 0;
    }
    const currentLantern = this.lanterns[this.currentLanternIndex];
    currentLantern.turnOnOff();
    this.timer.start(remaining || currentLantern.timing, this.changeColor);
  }

  handleMouseEnter(): void {
    this.timer.pause();
  }

  handleMouseLeave(): void {
    this.timer.resume();
  }

  getLastParams(): LastParams | undefined {
    const currentLantern = this.lanterns[this.currentLanternIndex];

    if (currentLantern) {
      const { color } = currentLantern;
      const { remaining } = this.timer;

      return {
        color,
        remaining,
      };
    }

    return undefined;
  }
}
