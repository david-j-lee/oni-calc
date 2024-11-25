import { ResourceName } from '../data/resources';
import IIOEntity from './IIOEntity';
import IIOReference from './IIOReference';
import { ResourceRate, ResourceUnit, ResourceValue } from './IResource';

export interface IIOBase {
  name: ResourceName;
  value: ResourceValue;
  unit: ResourceUnit;
  rate?: ResourceRate;

  record?: IIOEntity;

  // TODO: Convert to something else?
  dupe?: IIOReference;
}

export default interface IIO extends IIOBase {
  valueExtended: number;
  utilization: number;
}
