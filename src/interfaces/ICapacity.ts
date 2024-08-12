import ICapacityItem from './ICapacityItem';

export interface ICapacityBase {
  power?: ICapacityItem;
  resources?: ICapacityItem;
}

export default interface ICapacity {
  power: ICapacityItem;
  resources: ICapacityItem;
}
