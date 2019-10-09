import ICapacity from './ICapacity';
import IIO from './IIO';
import IPower from './IPower';

export default interface IBuilding {
  category: string;
  categoryImgUrl: string;
  name: string;
  imgUrl: string;
  wikiUrl: string;
  capacity: ICapacity;
  hasConsistentIO: boolean;
  power: IPower;
  inputs: IIO[];
  outputs: IIO[];
  quantity: number;
  utilization: number;
}
