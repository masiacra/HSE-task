export enum IncrementValue {
  Increment = 1,
  Decrement = -1,
}

export enum Color {
  Green = "green",
  Yellow = "yellow",
  Red = "red",
}

export interface LastParams {
  color: string;
  remaining: number;
}

export interface ITrafficLights {
  start(currentColor: string, remaining: number): void;
  stop(): void;
  resume(): void;
  getLastParams(): LastParams | undefined;
}
