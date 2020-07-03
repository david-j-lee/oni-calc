import IBuilding from './IBuilding';
import ISettings from './ISettings';

export default interface IState {
  tabIndex: number;
  settings: ISettings;
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
  plants: [];
  geysers: {};
}
