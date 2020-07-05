import IBuilding from './IBuilding';

export default interface IBuildingAggregate {
  buildings: IBuilding[];
  value: number;
}
