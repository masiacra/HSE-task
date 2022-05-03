export interface ILantern {
  turnOnOff(): void;
  timing: number;
  color: string;
}

export interface LanternConfiguration {
  timing: number;
  color: string;
}
