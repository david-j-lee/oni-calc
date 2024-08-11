import IBuilding from './IBuilding';

export default interface IBuildingsGrouped {
  [key: string]: IBuildingsGroupedItem;
}

export interface IBuildingsGroupedItem {
  name: string;
  normalizedName: string;
  image: string;
  buildings: IBuilding[];
}
