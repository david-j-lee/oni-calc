import IIO, { IIOBase } from './IIO';
import IFoodRequirement from './IFoodRequirement';

export interface IFoodBase {
  name: string;
  isRaw: boolean;
  quality: number;
  calories: number;
  inputs: IIOBase[];
  requirements: IFoodRequirement[];
}

export default interface IFood extends IFoodBase {
  quantity: number;
  inputs: IIO[];
  outputs: IIO[];
}
