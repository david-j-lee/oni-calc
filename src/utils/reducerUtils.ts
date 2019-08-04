import {
  updateResources,
  updateResourcesWithDupes,
  updateResourcesWithBuildings,
  updateResourcesWithFoodAndPlants,
  updateResourcesWithGeysers,
} from './resourceUtils';

import { updatePlants } from './plantUtils';

import {
  getDupes,
  updateDupeQuantity,
  updateDupeTraitQuantity,
  getDupeWaste,
  getDupesWithClearedInputs,
} from './dupeUtils';

import {
  getBuildings,
  getBuildingsWithClearedInputs,
  updateBuildingQuantity,
  updateBuildingUtilization,
} from './buildingUtils';

import {
  getFood,
  updateFoodQuantity,
  getFoodWithClearedInputs,
} from './foodUtils';

import {
  getGeysers,
  addGeyserToGeysers,
  deleteGeyserFromGeysers,
  getGeysersWithClearedInputs,
} from './geyserUtils';

import {
  getBuildingsPowerGeneration,
  getBuildingsPowerUsage,
} from './powerUtils';

import { getPowerCapacity, getResourcesCapacity } from './capacityUtils';
import { getSortedArray } from './commonUtils';

// calculator
export const getData = ({
  buildingInputs,
  buildings,
  dupeInputs,
  dupes,
  food,
  foodInputs,
  geyserInputs,
  geysers,
  plants,
  resources,
}) => {
  const newDupes = getDupes(dupes, dupeInputs);
  const newBuildings = getBuildings(buildings, buildingInputs);
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

// ui
export const setBuildingsLayout = layout => {
  const newLayout = layout === 'grid' ? 'table' : 'grid';
  localStorage.setItem('layout', newLayout);
  return {
    buildingsLayout: newLayout,
  };
};

// resources
export const sortResources = (resources, currentOrderBy, orderBy, order) => {
  const newOrder =
    currentOrderBy === orderBy && order === 'desc' ? 'asc' : 'desc';
  return {
    resources: getSortedArray(resources, orderBy, newOrder),
    resourcesOrderBy: orderBy,
    resourcesOrder: newOrder,
  };
};

// dupes
export const setDupesQuantity = (resources, dupes, quantity) => {
  const newDupes = updateDupeQuantity(dupes, quantity);
  return {
    resources: updateResourcesWithDupes(resources, newDupes),
    dupes: newDupes,
  };
};

export const setDupeTraitQuantity = (resources, dupes, name, quantity) => {
  const newDupes = updateDupeTraitQuantity(dupes, name, quantity);
  return {
    resources: updateResourcesWithDupes(resources, newDupes),
    dupes: newDupes,
  };
};

export const setDupeWaste = (resources, dupes, prop, value) => {
  const newDupes = getDupeWaste(dupes, prop, value);
  return {
    resources: updateResourcesWithDupes(resources, newDupes),
    dupes: newDupes,
  };
};

export const clearDupeInputs = (resources, dupes) => {
  const newDupes = getDupesWithClearedInputs(dupes);
  return {
    resources: updateResourcesWithDupes(resources, newDupes),
    dupes: newDupes,
  };
};

// buildings
export const sortBuildings = (buildings, currentOrderBy, orderBy, order) => {
  const newOrder =
    currentOrderBy === orderBy && order === 'desc' ? 'asc' : 'desc';
  return {
    buildings: getSortedArray(buildings, orderBy, newOrder),
    buildingsOrderBy: orderBy,
    buildingsOrder: newOrder,
  };
};

export const setBuildingQuantity = (resources, buildings, name, quantity) => {
  const newBuildings = updateBuildingQuantity(buildings, name, quantity);
  return {
    buildings: newBuildings,
    resources: updateResourcesWithBuildings(resources, newBuildings),
    powerGeneration: getBuildingsPowerGeneration(newBuildings),
    powerUsage: getBuildingsPowerUsage(newBuildings),
    powerCapacity: getPowerCapacity(newBuildings),
    resourcesCapacity: getResourcesCapacity(newBuildings),
  };
};

export const setBuildingUtilization = (
  resources,
  buildings,
  name,
  utilization,
) => {
  const newBuildings = updateBuildingUtilization(buildings, name, utilization);
  const newResources = updateResourcesWithBuildings(resources, newBuildings);
  return {
    buildings: newBuildings,
    resources: newResources,
    powerGeneration: getBuildingsPowerGeneration(newBuildings),
    powerUsage: getBuildingsPowerUsage(newBuildings),
  };
};

export const clearBuildingInputs = (resources, buildings) => {
  const newBuildings = getBuildingsWithClearedInputs(buildings);
  return {
    resources: updateResourcesWithBuildings(resources, newBuildings),
    buildings: newBuildings,
    powerGeneration: { value: 0, buildings: [] },
    powerUsage: { value: 0, buildings: [] },
    resourcesCapacity: { value: 0, buildings: [] },
    powerCapacity: { value: 0, buildings: [] },
  };
};

// food
export const setFoodQuantity = (resources, plants, food, name, quantity) => {
  const newFood = updateFoodQuantity(food, name, quantity);
  const newPlants = updatePlants(plants, newFood);
  const newResources = updateResourcesWithFoodAndPlants(
    resources,
    newPlants,
    newFood,
  );
  return {
    food: newFood,
    resources: newResources,
    plants: newPlants,
  };
};

export const clearFoodInputs = (resources, plants, food) => {
  const newFood = getFoodWithClearedInputs(food);
  const newPlants = updatePlants(plants, newFood);
  return {
    resources: updateResourcesWithFoodAndPlants(resources, newPlants, newFood),
    food: newFood,
    plants: newPlants,
  };
};

// geysers
export const addGeyser = (resources, geysers, geyser) => {
  const newGeysers = addGeyserToGeysers(geysers, geyser);
  const newResources = updateResourcesWithGeysers(resources, newGeysers);
  return {
    resources: newResources,
    geysers: newGeysers,
  };
};

export const deleteGeyser = (resources, geysers, geyser) => {
  const newGeysers = deleteGeyserFromGeysers(geysers, geyser);
  const newResources = updateResourcesWithGeysers(resources, newGeysers);
  return {
    resources: newResources,
    geysers: newGeysers,
  };
};

export const clearGeyserInputs = (resources, geysers) => {
  const newGeysers = getGeysersWithClearedInputs(geysers);
  return {
    resources: updateResourcesWithGeysers(resources, newGeysers),
    geysers: newGeysers,
  };
};
