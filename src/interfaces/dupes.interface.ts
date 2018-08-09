import { IDupeTrait } from './dupe-trait.interface';
import { IIO } from './io.interface';

export interface IDupes {
  inputs: IIO[];
  outputs: IIO[];
  traits: IDupeTrait[];
  waterValue: number;
  pollutedWaterValue: number;
  dirtValue: number;
  pollutedDirtValue: number;
}
