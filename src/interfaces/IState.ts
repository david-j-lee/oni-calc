import IBuilding from './IBuilding';
import IBuildingAggregate from './IBuildingAggregate';
import IDupes from './IDupes';
import IGeysers from './IGeysers';
import IIOEntity from './IIOEntity';
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

  resources: IResource[];
  resourcesOrderBy: string;
  resourcesOrder: 'asc' | 'desc';
  resourcesCapacity: IBuildingAggregate;

  powerUsage: IBuildingAggregate;
  powerGeneration: IBuildingAggregate;
  powerCapacity: IBuildingAggregate;

  dupes: IDupes;

  buildings: IBuilding[];
  buildingsOrderBy: string;
  buildingsOrder: 'asc' | 'desc';
  buildingsLayout: 'grid' | 'table';

  critters: IIOEntity[];
  plants: IPlant[];
  geysers: IGeysers;
}
