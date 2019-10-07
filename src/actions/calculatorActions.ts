// json data
import * as buildings from '../assets/json/buildings.json';
import * as dupes from '../assets/json/dupe.json';
import * as food from '../assets/json/food.json';
import * as geysers from '../assets/json/geysers.json';
import * as plants from '../assets/json/plants.json';
import * as resources from '../assets/json/resources.json';

// utils
import { getBuildings } from '../utils/buildingUtils.js';
import {
  getPowerCapacity,
  getResourcesCapacity,
} from '../utils/capacityUtils.js';
import { getDupes } from '../utils/dupeUtils.js';
import { getFood } from '../utils/foodUtils.js';
import { getGeysers } from '../utils/geyserUtils.js';
import { parseBuildingInputs, parseBuildings } from '../utils/parseUtils';
import { updatePlants } from '../utils/plantUtils.js';
import {
  getBuildingsPowerGeneration,
  getBuildingsPowerUsage,
} from '../utils/powerUtils.js';
import { updateResources } from '../utils/resourceUtils.js';

// TODO: Refactor
export const calculatorActions = {
  getData() {
    return state => {
      let dupeInputs: any = localStorage.getItem('dupes');
      let foodInputs: any = localStorage.getItem('food');
      let geyserInputs: any = localStorage.getItem('geysers');
      let layout: any = localStorage.getItem('layout');

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

      if (layout === null) {
        layout = 'grid';
      }

      const newDupes = getDupes(dupes, dupeInputs);
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
