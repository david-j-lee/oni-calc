import { initialState } from '../context/initialState';
import { buildings } from '../data/buildings';
import { critters } from '../data/critters';
import { dupes } from '../data/dupes';
import { geysers } from '../data/geysers';
import { plants } from '../data/plants';
import { resources } from '../data/resources';
import IBuilding from '../interfaces/IBuilding';
import IDupeInput from '../interfaces/IDupeInput';
import IDupes from '../interfaces/IDupes';
import IGeyserInput from '../interfaces/IGeyserInput';
import IIOEntity from '../interfaces/IIOEntity';
import IPlant from '../interfaces/IPlant';
import ISettings from '../interfaces/ISettings';
import IVariantInput from '../interfaces/IVariantInput';
import IOBuildings from '../services/IOBuildings';
import IOCritters from '../services/IOCritters';
import IOPlants from '../services/IOPlants';
import { getPowerCapacity, getResourcesCapacity } from '../utils/capacityUtils';
import { getImgUrl } from '../utils/commonUtils';
import { getDupes } from '../utils/dupeUtils';
import { getGeysers } from '../utils/geyserUtils';
import { parseBuildingInputs, parseBuildings } from '../utils/parseUtils';
import {
  getBuildingsPowerGeneration,
  getBuildingsPowerUsage,
} from '../utils/powerUtils';
import { updateResources } from '../utils/resourceUtils';
import IState from './../interfaces/IState';

// TODO: Refactor
export const calculatorActions = {
  getData: () => {
    return (state: IState) => {
      const dupeInputs = getJsonFromLocalStorage<IDupeInput>('dupes');
      const plantInputs = getJsonFromLocalStorage<IVariantInput[]>('plants');
      const critterInputs =
        getJsonFromLocalStorage<IVariantInput[]>('critters');
      const geyserInputs = getJsonFromLocalStorage<IGeyserInput[]>('geysers');
      const settings = getJsonFromLocalStorage<ISettings>('settings');
      let layout = localStorage.getItem('layout');

      // remove old settings
      localStorage.removeItem('quantities');
      localStorage.removeItem('inputs');

      if (layout === null) {
        layout = 'grid';
      }

      const newSettings = settings ? settings : initialState.settings;
      const gameMode = newSettings.gameMode;
      const newDupes = getDupes(
        newSettings.gameMode,
        dupes as IDupes,
        dupeInputs,
      );
      const newBuildings = IOBuildings.getAll<IBuilding>(
        gameMode,
        parseBuildings(buildings),
        parseBuildingInputs(localStorage.getItem('buildings')),
      );
      const newPlants = IOPlants.getAll<IPlant>(
        gameMode,
        IOPlants.getDefault(
          plants.map((plant) => ({
            ...plant,
            imgUrl: getImgUrl('bio', plant.name),
          })),
        ),
        plantInputs,
      );
      const newCritters = IOCritters.getAll<IIOEntity>(
        gameMode,
        IOCritters.getDefault(
          critters.map((critter) => ({
            ...critter,
            imgUrl: getImgUrl('critters', critter.name),
          })),
        ),
        critterInputs,
      );
      const newGeysers = getGeysers(geysers, geyserInputs);
      const newResources = updateResources({
        gameMode,
        resources,
        plants: newPlants,
        dupes: newDupes,
        buildings: newBuildings,
        critters: newCritters,
        geysers: newGeysers,
      });

      return {
        ...state,
        settings: newSettings,
        buildingsLayout: layout,
        resources: newResources,
        buildings: newBuildings,
        critters: newCritters,
        plants: newPlants,
        dupes: newDupes,
        geysers: newGeysers,
        powerGeneration: getBuildingsPowerGeneration(newBuildings),
        powerUsage: getBuildingsPowerUsage(newBuildings),
        powerCapacity: getPowerCapacity(newBuildings),
        resourcesCapacity: getResourcesCapacity(newBuildings),
      };
    };
  },
};

function getJsonFromLocalStorage<Type>(key: string): Type | undefined {
  const jsonString = localStorage.getItem(key);

  if (!jsonString) {
    return;
  }

  try {
    return JSON.parse(jsonString) as Type;
  } catch (e) {
    localStorage.removeItem(key);
    throw e;
  }
}
