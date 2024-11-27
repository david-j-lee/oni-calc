import IIOEntity, { IIOEntityBase } from './IIOEntity';
import IIOVariant from './IIOVariant';

export interface IPlantBase extends IIOEntityBase {
  yield: number;
  growthRate: IPlantGrowthRate;
  variants?: IIOVariant[];
}

export default interface IPlant extends IIOEntity, IPlantBase {
  growthRate: IPlantGrowthRate;
}

interface IPlantGrowthRate {
  value: number;
  rate: string;
}
