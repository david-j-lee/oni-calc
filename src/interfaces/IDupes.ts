import IDupeTrait from './IDupeTrait';
import IIO from './IIO';

export default interface IDupes {
  quantity: number;
  inputs: IIO[];
  outputs: IIO[];
  traits: IDupeTrait[];
  caloriesRequired: number;
  waterValue: number;
  pollutedWaterValue: number;
  dirtValue: number;
  pollutedDirtValue: number;
}
