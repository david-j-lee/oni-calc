import ICapacity, { ICapacityBase } from './ICapacity';
import IIO, { IIOBase } from './IIO';
import IPower, { IPowerBase } from './IPower';

export interface IBuildingBase {
  category: string;
  name: string;
  capacity?: ICapacityBase;
  hasConsistentIO: boolean;
  power?: IPowerBase;
  inputs?: IIOBase[];
  outputs?: IIOBase[];
}

export default interface IBuilding extends IBuildingBase {
  categoryImgUrl: string;
  imgUrl: string;
  wikiUrl: string;
  quantity: number;
  capacity: ICapacity;
  utilization: number;
  power: IPower;
  inputs: IIO[];
  outputs: IIO[];
}
