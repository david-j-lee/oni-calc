// json data
import { buildings } from '../data/buildings';
import { dupes } from '../data/dupes';
import { food } from '../data/food';
import { geysers } from '../data/geysers';
import { plants } from '../data/plants';
import { resources } from '../data/resources';

// utils
import { getBuildings } from '../utils/buildingUtils';
import { getPowerCapacity, getResourcesCapacity } from '../utils/capacityUtils';
import { getDupes } from '../utils/dupeUtils';
import { getFood } from '../utils/foodUtils';
import { getGeysers } from '../utils/geyserUtils';
import { parseBuildingInputs, parseBuildings } from '../utils/parseUtils';
import { updatePlants } from '../utils/plantUtils';
import {
  getBuildingsPowerGeneration,
  getBuildingsPowerUsage,
} from '../utils/powerUtils';
import { updateResources } from '../utils/resourceUtils';
import { initialState } from '../context/context';

import IDupes from '../interfaces/IDupes';
import IState from './../interfaces/IState';
import ISettings from '../interfaces/ISettings';
import IDupeInput from '../interfaces/IDupeInput';
import IFoodInput from '../interfaces/IFoodInput';
import IGeyserInput from '../interfaces/IGeyserInput';

// TODO: Refactor
export const calculatorActions = {
  getData() {
    return (state: IState) => {
      const dupeInputs = getJsonFromLocalStorage<IDupeInput>('dupes');
      const foodInputs = getJsonFromLocalStorage<IFoodInput[]>('food');
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
      const newDupes = getDupes(
        newSettings.gameMode,
        dupes as IDupes,
        dupeInputs,
      );
      const newBuildings = getBuildings(
        parseBuildings(buildings),
        parseBuildingInputs(localStorage.getItem('buildings')),
      );
      const newFood = getFood(food, foodInputs);
      const newGeysers = getGeysers(geysers, geyserInputs);
      const newPlants = updatePlants(plants, newFood);
      const newResources = updateResources({
        resources,
        plants: newPlants,
        dupes: newDupes,
        buildings: newBuildings,
        food: newFood,
        geysers: newGeysers,
      });

      return {
        ...state,
        settings: newSettings,
        buildingsLayout: layout,
        resources: newResources,
        plants: newPlants,
        dupes: newDupes,
        buildings: newBuildings,
        food: newFood,
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
    return JSON.parse(jsonString);
  } catch (e) {
    localStorage.removeItem(key);
    throw e;
  }
}
