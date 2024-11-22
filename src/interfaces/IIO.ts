import IGameModeValue from './IGameModeValue';
import IIOEntity from './IIOEntity';
import IIOReference from './IIOReference';

export interface IIOBase {
  name: string;
  value: IGameModeValue | number;
  unit: string;
  rate: string;

  record?: IIOEntity;

  // TODO: Convert to something else?
  dupe?: IIOReference;
}

export default interface IIO extends IIOBase {
  valueExtended: number;
  utilization: number;
}
