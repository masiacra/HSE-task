export interface ITimer {
  remaining: number;
  start(time: number, callback: () => void): void;
  pause(): void;
  resume(): void;
}
