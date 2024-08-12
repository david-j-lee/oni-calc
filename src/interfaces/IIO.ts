import IBuilding from './IBuilding';
import IFood from './IFood';
import IGameModeValue from './IGameModeValue';
import IIOReference from './IIOReference';
import IPlant from './IPlant';

export interface IIOBase {
  name: string;
  value: IGameModeValue | number;
  unit: string;
  rate: string;

  building?: IBuilding;
  dupe?: IIOReference;
  food?: IFood;
  plant?: IPlant;
}

export default interface IIO extends IIOBase {
  valueExtended: number;
}
