import IGeyserOutput from './IGeyserOutput';

export default interface IGeyser {
  name: string;
  temp: IGeyserTemp;
  maxPressure: IGeyserMaxPressure;
  outputs: IGeyserOutput[];
}

export interface IGeyserTemp {
  value: number;
  unit: string;
}

export interface IGeyserMaxPressure {
  value: number;
  unit: string;
}
