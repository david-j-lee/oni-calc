import IBuilding from './IBuilding';
import IBuildingAggregate from './IBuildingAggregate';
import IDupes from './IDupes';
import IFood from './IFood';
import IGeysers from './IGeysers';
import IPlant from './IPlant';
import IResource from './IResource';
import ISettings from './ISettings';
import IThemeSaved from './IThemeSaved';

export default interface IState {
  tabIndex: number;
  settings: ISettings;
  collapseBuildingPanels: boolean;
  collapseBuildingPanelsTrigger: number;
  theme: IThemeSaved | null;
  buildingsOrder: 'asc' | 'desc';
  buildings: IBuilding[];
  buildingsLayout: 'grid' | 'table';
  buildingsOrderBy: string;
  resources: IResource[];
  resourcesOrderBy: string;
  resourcesOrder: 'asc' | 'desc';
  powerUsage: IBuildingAggregate;
  powerGeneration: IBuildingAggregate;
  powerCapacity: IBuildingAggregate;
  resourcesCapacity: IBuildingAggregate;
  dupes: IDupes;
  food: IFood[];
  plants: IPlant[];
  plantsOrderBy: string;
  plantsOrder: 'asc' | 'desc';
  geysers: IGeysers;
}
