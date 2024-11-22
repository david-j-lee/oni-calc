import ICapacity, { ICapacityBase } from './ICapacity';
import IIOEntity, { IIOEntityBase } from './IIOEntity';
import IPower, { IPowerBase } from './IPower';

export interface IBuildingBase extends IIOEntityBase {
  category: string;
  capacity?: ICapacityBase;
  power?: IPowerBase;
  hasConsistentIO: boolean;
}

export default interface IBuilding extends IIOEntity, IBuildingBase {
  categoryImgUrl: string;
  capacity: ICapacity;
  power: IPower;
}
