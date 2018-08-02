import { Capacity } from './capacity.interface';
import { IO } from './io.interface';
import { Power } from './power.interface';

export interface Building {
  category: string;
  name: string;
  capacity: Capacity;
  hasConsistentIO: boolean;
  power: Power;
  inputs: Array<IO>;
  outputs: Array<IO>;
  quantity: number;
  utilization: number;
}
