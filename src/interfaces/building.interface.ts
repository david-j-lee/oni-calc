import { ICapacity } from './capacity.interface';
import { IIO } from './io.interface';
import { IPower } from './power.interface';

export interface IBuilding {
  category: string;
  name: string;
  capacity: ICapacity;
  hasConsistentIO: boolean;
  power: IPower;
  inputs: IIO[];
  outputs: IIO[];
  quantity: number;
  utilization: number;
}
