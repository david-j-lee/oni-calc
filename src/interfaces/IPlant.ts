import IIOEntity, { IIOEntityBase } from './IIOEntity';
import IIOVariant from './IIOVariant';
import IPlantRequirement from './IPlantRequirement';

export interface IPlantBase extends IIOEntityBase {
  yield: number;
  growthRate: IPlantGrowthRate;
  variants?: IIOVariant[];
}

export default interface IPlant extends IIOEntity, IPlantBase {
  growthRate: IPlantGrowthRate;
  rawFood: IPlantRequirement[];
  preparedFood: IPlantRequirement[];
}

interface IPlantGrowthRate {
  value: number;
  rate: string;
}
