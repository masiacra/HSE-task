import { ITrafficLights, Color } from "../traffic-lights/traffic-lights.types";
import { TrafficLights } from "../traffic-lights/traffic-lights.component";
import { LocalStorageItems } from "./application.types";
import { SECOND } from "../traffic-lights/traffic-lights.constants";

export class Application {
  private form: HTMLFormElement;
  private trafficLights: ITrafficLights | null = null;

  constructor(form: HTMLFormElement) {
    this.form = form;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.handleBeforeUnload = this.handleBeforeUnload.bind(this);

    this.form.onsubmit = this.handleSubmit;
    const startButton = this.form.start;
    const stopButton = this.form.stop;

    if (startButton) {
      startButton.onclick = this.start;
    }

    if (stopButton) {
      stopButton.onclick = this.stop;
    }

    const currentColor = localStorage.getItem(LocalStorageItems.CurrentColor);
    const remaining = localStorage.getItem(LocalStorageItems.Remaining);

    if (currentColor && remaining) {
      this.start(currentColor, parseFloat(remaining));
    }

    window.addEventListener("beforeunload", this.handleBeforeUnload);
  }

  private start(currentColor?: string, remaining = 0): void {
    const firstInput = this.form.firstLantern;
    const secondInput = this.form.secondLantern;
    const thirdInput = this.form.thirdLantern;

    if (!firstInput || !secondInput || !thirdInput) {
      console.error("Can't reach all inputs");
      return;
    }

    const firstTiming = parseInt(firstInput.value, 10) || 1;
    const secondTiming = parseInt(secondInput.value, 10) || 1;
    const thirdTiming = parseInt(thirdInput.value, 10) || 1;

    const div = document.querySelector(".traffic-lights");

    if (div) {
      div.innerHTML = "";
      const trafficLights = new TrafficLights(div as HTMLElement, [
        { color: Color.Green, timing: firstTiming },
        { color: Color.Yellow, timing: secondTiming },
        { color: Color.Red, timing: thirdTiming },
      ]);

      trafficLights.start(currentColor, remaining);

      this.trafficLights = trafficLights;
    }
  }

  private stop(): void {
    if (this.trafficLights) {
      this.trafficLights.stop();
    }
  }

  private handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
  }

  private handleBeforeUnload() {
    const trafficLights = this.trafficLights;

    if (trafficLights) {
      const lastParams = trafficLights.getLastParams();
      // if not stopped then stop
      trafficLights.stop();

      if (lastParams) {
        const { color, remaining } = lastParams;
        localStorage.setItem(LocalStorageItems.CurrentColor, color);
        localStorage.setItem(
          LocalStorageItems.Remaining,
          String(remaining / SECOND)
        );
      }
    }
  }
}
