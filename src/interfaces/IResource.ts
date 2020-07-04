import IIO from './IIO';

export default interface IResource {
  name: string;
  unitOfMeasure: string;

  totalIO: number;
  totalInput: number;
  totalOutput: number;

  totalBuildingIO: number;
  totalBuildingInput: number;
  totalBuildingOutput: number;
  buildingInputs: IIO[];
  buildingOutputs: IIO[];

  totalDupeIO: number;
  totalDupeInput: number;
  totalDupeOutput: number;
  dupeInputs: IIO[];
  dupeOutputs: IIO[];

  totalFoodIO: number;
  totalFoodInput: number;
  totalFoodOutput: number;
  foodInputs: IIO[];
  foodOutputs: IIO[];

  totalGeyserIO: number;
  totalGeyserInput: number;
  totalGeyserOutput: number;
  geyserInputs: IIO[];
  geyserOutputs: IIO[];

  totalPlantIO: number;
  totalPlantInput: number;
  totalPlantOutput: number;
  plantInputs: IIO[];
  plantOutputs: IIO[];
}
