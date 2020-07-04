import IIO from './IIO';

export default interface IDupeTrait {
  name: string;
  inputs: IIO[];
  outputs: IIO[];
  quantity: number;
}
