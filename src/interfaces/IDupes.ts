import IDupeTrait from './IDupeTrait';
import IIO from './IIO';

export interface IDupeIO extends Omit<IIO, 'name'> {
  name: IIO['name'] | 'Food';
}

export default interface IDupes {
  quantity: number;
  inputs: IDupeIO[];
  outputs: IDupeIO[];
  traits: IDupeTrait[];
  caloriesRequired: number;
  waterValue: number;
  pollutedWaterValue: number;
  dirtValue: number;
  pollutedDirtValue: number;
}
