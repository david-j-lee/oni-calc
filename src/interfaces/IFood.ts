import IIO from './IIO';
import IFoodRequirement from './IFoodRequirement';

export default interface IFood {
  name: string;
  isRaw: boolean;
  quality: number;
  calories: number;
  quantity: number;
  inputs: IIO[];
  requirements: IFoodRequirement[];
}
