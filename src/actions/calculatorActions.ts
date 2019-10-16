// json data
import { buildings } from '../assets/data/buildings';
import { dupes } from '../assets/data/dupes';
import { food } from '../assets/data/food';
import { geysers } from '../assets/data/geysers';
import { plants } from '../assets/data/plants';
import { resources } from '../assets/data/resources';

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
import { INITIAL_STATE } from './../context';

// TODO: Refactor
export const calculatorActions = {
  getData() {
    return state => {
      let dupeInputs: any = localStorage.getItem('dupes');
      let foodInputs: any = localStorage.getItem('food');
      let geyserInputs: any = localStorage.getItem('geysers');
      let layout: any = localStorage.getItem('layout');
      let settings: any = localStorage.getItem('settings');

      // remove old settings
      localStorage.removeItem('quantities');
      localStorage.removeItem('inputs');

      try {
        dupeInputs = JSON.parse(dupeInputs);
      } catch (e) {
        localStorage.removeItem('dupes');
        throw e;
      }

      try {
        foodInputs = JSON.parse(foodInputs);
      } catch (e) {
        localStorage.removeItem('food');
        throw e;
      }

      try {
        geyserInputs = JSON.parse(geyserInputs);
      } catch (e) {
        localStorage.removeItem('geysers');
        throw e;
      }

      try {
        settings = JSON.parse(settings);
      } catch (e) {
        localStorage.removeItem('settings');
        throw e;
      }

      if (layout === null) {
        layout = 'grid';
      }

      const newSettings = settings ? settings : INITIAL_STATE.settings;
      const newDupes = getDupes(newSettings.gameMode, dupes, dupeInputs);
      const newBuildings = getBuildings(
        parseBuildings(buildings),
        parseBuildingInputs(localStorage.getItem('buildings')),
      );
      const newFood = getFood(food, foodInputs);
      const newGeysers = getGeysers(geysers, geyserInputs);
      const newPlants = updatePlants(plants, newFood);
      const newResources = updateResources({
        gameMode: newSettings.gameMode,
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
