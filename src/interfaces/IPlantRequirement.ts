import IFood from './IFood';

export default interface IPlantRequirement {
  type: string;
  name: string;
  food: IFood;
  quantity: number;
}
