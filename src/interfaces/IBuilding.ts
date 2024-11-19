import ICapacity, { ICapacityBase } from './ICapacity';
import IIO from './IIO';
import IIOVariant from './IIOVariant';
import IPower, { IPowerBase } from './IPower';

export interface IBuildingBase {
  category: string;
  name: string;
  capacity?: ICapacityBase;
  hasConsistentIO: boolean;
  power?: IPowerBase;
  variants?: IIOVariant[];
}

export default interface IBuilding extends IBuildingBase {
  categoryImgUrl: string;
  imgUrl: string;
  wikiUrl: string;
  quantity: number;
  capacity: ICapacity;
  utilization: number;
  variantUtilizations: number[];
  power: IPower;
  inputs: IBuildingIO[];
  outputs: IBuildingIO[];
}

export interface IBuildingIO extends IIO {
  utilization: number;
}
