import { IDupeIO } from './IDupes';

export default interface IDupeTrait {
  name: string;
  inputs: IDupeIO[];
  outputs: IDupeIO[];
  quantity: number;
}
