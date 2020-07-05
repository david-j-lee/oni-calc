import IBuilding from './IBuilding';
import IIOReference from './IIOReference';
import IFood from './IFood';
import IPlant from './IPlant';
import IGameModeValue from './IGameModeValue';

export default interface IIO {
  name: string;
  value: IGameModeValue | number;
  valueExtended: number;
  unit: string;
  rate: string;

  building?: IBuilding;
  dupe?: IIOReference;
  food?: IFood;
  plant?: IPlant;
}
