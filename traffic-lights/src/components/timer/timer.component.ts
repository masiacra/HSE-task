import { ITimer } from "./timer.types";
import { noop } from "./timer.constants";

export class Timer implements ITimer {
  private timerId?: number;
  private _remaining: number = 0;
  private _start: number = 0;
  private _callback: () => void = noop;

  get remaining() {
    return this._remaining;
  }

  start(delay: number, callback: () => void): void {
    this._callback = callback;
    this._start = Date.now();
    this._remaining = delay;
    this.timerId = window.setTimeout(this._callback, delay);
  }

  pause(): void {
    clearTimeout(this.timerId);
    this.timerId = undefined;
    this._remaining -= Date.now() - this._start;
  }

  resume(): void {
    this._start = Date.now();
    this.timerId = window.setTimeout(this._callback, this._remaining);
  }
}
