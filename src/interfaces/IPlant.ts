import IIO from './IIO';
import IPlantRequirement from './IPlantRequirement';

export default interface IPlant {
  name: string;
  quantity: number;
  yield: number;
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
