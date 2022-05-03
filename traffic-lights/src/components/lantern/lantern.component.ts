import { ILantern } from "./lantern.types";
import { TURNED_OFF_OPACITY, TURNED_ON_OPACITY } from "./lantern.constants";

export class Lantern implements ILantern {
  private isOn: boolean;
  private div: HTMLDivElement;
  private _color: string;
  public _timing: number;
  private onMouseEnter: () => void;
  private onMouseLeave: () => void;

  constructor(
    color: string,
    timing: number,
    div: HTMLDivElement,
    onMouseEnter: () => void,
    onMouseLeave: () => void
  ) {
    this._timing = timing;
    this.div = div;
    this.isOn = false;
    this._color = color;
    this.div.style.backgroundColor = color;
    this.div.style.opacity = TURNED_OFF_OPACITY;
    this.onMouseEnter = onMouseEnter;
    this.onMouseLeave = onMouseLeave;

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.div.onmouseenter = this.handleMouseEnter;
    this.div.onmouseleave = this.handleMouseLeave;
  }

  get color(): string {
    return this._color;
  }

  get timing(): number {
    return this._timing;
  }

  private handleMouseEnter(): void {
    if (this.isOn) {
      this.onMouseEnter();
    }
  }

  private handleMouseLeave(): void {
    if (this.isOn) {
      this.onMouseLeave();
    }
  }

  turnOnOff(): void {
    const newOpacity = this.isOn ? TURNED_OFF_OPACITY : TURNED_ON_OPACITY;
    this.div.style.opacity = newOpacity;
    this.isOn = !this.isOn;
  }
}
