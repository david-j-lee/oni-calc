import IBuilding from './IBuilding';

export default interface IState {
  tabIndex: number;
  collapseBuildingPanels: boolean;
  collapseBuildingPanelsTrigger: boolean;
  buildings: IBuilding[];
  buildingsLayout: string;
  buildingsOrderBy: string;
  buildingOrder: string;
  resources: [];
  resourcesOrderBy: string;
  resourcesOrder: string;
  theme: any;
  powerUsage: {};
  powerGeneration: {};
  powerCapacity: {};
  resourcesCapacity: {};
  dupes: {};
  food: [];
  geysers: {};
}
