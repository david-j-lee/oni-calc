import IBuilding from './IBuilding';
import IIOReference from './IIOReference';
import IFood from './IFood';
import IPlant from './IPlant';
import IGameModeValue from './IGameModeValue';

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
