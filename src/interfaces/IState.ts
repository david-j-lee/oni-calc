import IBuilding from './IBuilding';
import IDupes from './IDupes';
import ISettings from './ISettings';
import IBuildingAggregate from './IBuildingAggregate';
import IFood from './IFood';
import IPlant from './IPlant';
import IGeysers from './IGeysers';

export default interface IState {
  tabIndex: number;
  settings: ISettings;
  collapseBuildingPanels: boolean;
  collapseBuildingPanelsTrigger: boolean;
  theme: any;
  buildingOrder: string;
  buildings: IBuilding[];
  buildingsLayout: string;
  buildingsOrderBy: string;
  resources: [];
  resourcesOrderBy: string;
  resourcesOrder: string;
  powerUsage: IBuildingAggregate;
  powerGeneration: IBuildingAggregate;
  powerCapacity: IBuildingAggregate;
  resourcesCapacity: IBuildingAggregate;
  dupes: IDupes;
  food: IFood[];
  plants: IPlant[];
  geysers: IGeysers;
}
