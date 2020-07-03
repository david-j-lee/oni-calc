import IDupeTrait from './IDupeTrait';
import IIO from './IIO';

export interface IDupes {
  inputs: IIO[];
  outputs: IIO[];
  traits: IDupeTrait[];
  waterValue: number;
  pollutedWaterValue: number;
  dirtValue: number;
  pollutedDirtValue: number;
}
