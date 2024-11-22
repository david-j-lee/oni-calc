import IIO from './IIO';

export default interface IIOTotal {
  total: number;
  totalInput: number;
  totalOutput: number;
  inputs: IIO[];
  outputs: IIO[];
}
