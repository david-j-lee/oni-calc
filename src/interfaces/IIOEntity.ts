import IIO from './IIO';
import IIOVariant from './IIOVariant';

export interface IIOEntityBase {
  name: string;
  variants?: IIOVariant[];
}

export default interface IIOEntity extends IIOEntityBase {
  inputs: IIO[];
  outputs: IIO[];
  quantity: number;
  utilization: number;
  variantUtilizations: number[];
  imgUrl?: string;
  wikiUrl?: string;
}
