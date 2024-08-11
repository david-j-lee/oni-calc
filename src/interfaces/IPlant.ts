import IIO, { IIOBase } from './IIO';
import IPlantRequirement from './IPlantRequirement';

export interface IPlantBase {
  name: string;
  yield: number;
  growthRate: IPlantGrowthRate;
  inputs?: IIOBase[];
}

export default interface IPlant extends IPlantBase {
  quantity: number;
  growthRate: IPlantGrowthRate;
  rawFood: IPlantRequirement[];
  preparedFood: IPlantRequirement[];
  inputs: IIO[];
  outputs: IIO[];
}

interface IPlantGrowthRate {
  value: number;
  rate: string;
}
