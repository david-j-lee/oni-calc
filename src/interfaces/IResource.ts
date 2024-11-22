import IIO from './IIO';
import IIOTotal from './IIOTotal';

export interface IResourceBase {
  name: string;
}

export default interface IResource extends IResourceBase {
  unitOfMeasure: string;

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
