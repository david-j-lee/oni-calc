import { IIO } from './io.interface';

export interface IDupeTrait {
  name: string;
  inputs: IIO[];
  outputs: IIO[];
}
