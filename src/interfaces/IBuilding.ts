import ICapacity, { ICapacityBase } from './ICapacity';
import IIOEntity, { IIOEntityBase } from './IIOEntity';
import IPower, { IPowerBase } from './IPower';

export interface IBuildingBase extends IIOEntityBase {
  category: string;
  capacity?: ICapacityBase;
  power?: IPowerBase;
}

export default interface IBuilding extends IIOEntity, IBuildingBase {
  categoryImgUrl: string;
  capacity: ICapacity;
  power: IPower;
}
