import { ResourceName } from '../data/resources';
import IGameModeValue from './IGameModeValue';
import IIO from './IIO';
import IIOTotal from './IIOTotal';

export type ResourceRate = 'per second' | 'per cycle' | 'per item';
export type ResourceUnit = 'mg' | 'g' | 'kg' | 'each' | 'kcal';
export type ResourceValue = IGameModeValue | number;

export interface IResourceBase {
  name: ResourceName;
  unitOfMeasure?: string;
}

export default interface IResource extends IResourceBase {
  subtotals: {
    buildings: IIOTotal;
    plants: IIOTotal;
    critters: IIOTotal;
  };

  total: number;
  totalInput: number;
  totalOutput: number;

  // TODO: Remove props below

  totalDupeIO: number;
  totalDupeInput: number;
  totalDupeOutput: number;
  dupeInputs: IIO[];
  dupeOutputs: IIO[];

  totalGeyserIO: number;
  totalGeyserInput: number;
  totalGeyserOutput: number;
  geyserInputs: IIO[];
  geyserOutputs: IIO[];
}
