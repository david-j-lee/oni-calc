import IBuilding from '../interfaces/IBuilding';
import IDupes from './../interfaces/IDupes';
import IFood from '../interfaces/IFood';
import IPlant from './../interfaces/IPlant';
import IResource, { IResourceBase } from './../interfaces/IResource';

import {
  getPlantsInputsForResource,
  getPlantsOutputsForResource,
} from './plantUtils';

import {
  getDupesInputsForResource,
  getDupesOutputsForResource,
} from './dupeUtils';

import {
  getBuildingsInputsForResource,
  getBuildingsOutputsForResource,
} from './buildingUtils';

import { getFoodInputsForResource } from './foodUtils';

import { getIOTotal, getSortedArray } from './commonUtils';
import { getGeyserOutputs } from './geyserUtils';
import IGeysers from '../interfaces/IGeysers';
import IIO from '../interfaces/IIO';

export const sortResources = (
  resources: IResource[],
  currentOrderBy: string,
  orderBy: string,
  order: string,
) => {
  const newOrder =
    currentOrderBy === orderBy && order === 'desc' ? 'asc' : 'desc';
  return {
    resources: getSortedArray(resources, orderBy, newOrder),
    resourcesOrderBy: orderBy,
    resourcesOrder: newOrder,
  };
};

// -----------------------------------------------------------

export function getClearedResources(resources: IResource[]) {
  return resources.map((resource) => {
    resource.totalInput = 0;
    resource.totalOutput = 0;
    resource.totalIO = 0;
    return resource;
  });
}

export function updateResources({
  resources,
  plants,
  dupes,
  buildings,
  food,
  geysers,
}: {
  resources: IResourceBase[];
  plants: IPlant[];
  dupes: IDupes;
  buildings: IBuilding[];
  food: IFood[];
  geysers: IGeysers;
}) {
  return resources.map((resource: IResourceBase) => {
    const updatedResource = {
      ...resource,
      ...resourceDupes(resource, dupes),
      ...resourceBuildings(resource, buildings),
      ...resourceFood(resource, food),
      ...resourcePlants(resource, plants),
      ...resourceGeysers(resource, geysers),
    } as IResource;
    updatedResource.totalInput = getTotalInput(updatedResource);
    updatedResource.totalOutput = getTotalOutput(updatedResource);

    return {
      ...updatedResource,
      totalIO: updatedResource.totalOutput - updatedResource.totalInput,
      unitOfMeasure: 'g/s',
    };
  });
}

export function updateResourcesWithBuildings(
  resources: IResource[],
  buildings: IBuilding[],
) {
  return resources.map((resource) => {
    const updatedResource = {
      ...resource,
      ...resourceBuildings(resource, buildings),
    };
    updatedResource.totalInput = getTotalInput(updatedResource);
    updatedResource.totalOutput = getTotalOutput(updatedResource);

    return {
      ...updatedResource,
      totalIO: updatedResource.totalOutput - updatedResource.totalInput,
    };
  });
}

export function updateResourcesWithDupes(
  resources: IResource[],
  dupes: IDupes,
) {
  return resources.map((resource) => {
    const updatedResource = {
      ...resource,
      ...resourceDupes(resource, dupes),
    };
    updatedResource.totalInput = getTotalInput(updatedResource);
    updatedResource.totalOutput = getTotalOutput(updatedResource);

    return {
      ...updatedResource,
      totalIO: updatedResource.totalOutput - updatedResource.totalInput,
    };
  });
}

export function updateResourcesWithFoodAndPlants(
  resources: IResource[],
  plants: IPlant[],
  food: IFood[],
) {
  return resources.map((resource) => {
    const updatedResource = {
      ...resource,
      ...resourceFood(resource, food),
      ...resourcePlants(resource, plants),
    };
    updatedResource.totalInput = getTotalInput(updatedResource);
    updatedResource.totalOutput = getTotalOutput(updatedResource);

    return {
      ...updatedResource,
      totalIO: updatedResource.totalOutput - updatedResource.totalInput,
    };
  });
}

export function updateResourcesWithGeysers(
  resources: IResource[],
  geysers: IGeysers,
) {
  return resources.map((resource) => {
    const updatedResource = {
      ...resource,
      ...resourceGeysers(resource, geysers),
    };
    updatedResource.totalInput = getTotalInput(updatedResource);
    updatedResource.totalOutput = getTotalOutput(updatedResource);

    return {
      ...updatedResource,
      totalIO: updatedResource.totalOutput - updatedResource.totalInput,
    };
  });
}

function resourceDupes(resource: IResourceBase, dupes: IDupes) {
  const dupeInputs = getDupesInputsForResource(dupes, resource.name);
  const dupeOutputs = getDupesOutputsForResource(dupes, resource.name);
  const totalDupeInput = getIOTotal(dupeInputs);
  const totalDupeOutput = getIOTotal(dupeOutputs);

  return {
    dupeInputs,
    dupeOutputs,
    totalDupeInput,
    totalDupeOutput,
    totalDupeIO: totalDupeOutput - totalDupeInput,
  };
}

function resourceBuildings(resource: IResourceBase, buildings: IBuilding[]) {
  const buildingInputs = getBuildingsInputsForResource(
    buildings,
    resource.name,
  );
  const buildingOutputs = getBuildingsOutputsForResource(
    buildings,
    resource.name,
  );
  const totalBuildingInput = getIOTotal(buildingInputs);
  const totalBuildingOutput = getIOTotal(buildingOutputs);

  return {
    buildingInputs,
    buildingOutputs,
    totalBuildingInput,
    totalBuildingOutput,
    totalBuildingIO: totalBuildingOutput - totalBuildingInput,
  };
}

function resourceFood(resource: IResourceBase, food: IFood[]) {
  const foodInputs = getFoodInputsForResource(food, resource.name);
  const foodOutputs: IIO[] = [];
  const totalFoodInput = getIOTotal(foodInputs);
  const totalFoodOutput = getIOTotal(foodOutputs);

  return {
    foodInputs,
    foodOutputs,
    totalFoodInput,
    totalFoodOutput,
    totalFoodIO: totalFoodOutput - totalFoodInput,
  };
}

function resourcePlants(resource: IResourceBase, plants: IPlant[]) {
  const plantInputs = getPlantsInputsForResource(plants, resource.name);
  const plantOutputs = getPlantsOutputsForResource(plants, resource.name);
  const totalPlantInput = getIOTotal(plantInputs);
  const totalPlantOutput = getIOTotal(plantOutputs);

  return {
    plantInputs,
    plantOutputs,
    totalPlantInput,
    totalPlantOutput,
    totalPlantIO: totalPlantOutput - totalPlantInput,
  };
}

function resourceGeysers(resource: IResourceBase, geysers: IGeysers) {
  const geyserInputs: IIO[] = [];
  const geyserOutputs = getGeyserOutputs(geysers, resource.name);
  const totalGeyserInput = getIOTotal(geyserInputs);
  const totalGeyserOutput = getIOTotal(geyserOutputs);

  return {
    geyserInputs,
    geyserOutputs,
    totalGeyserInput,
    totalGeyserOutput,
    totalGeyserIO: totalGeyserOutput - totalGeyserInput,
  };
}

function getTotalInput(resource: IResource) {
  return (
    resource.totalDupeInput +
    resource.totalBuildingInput +
    resource.totalPlantInput +
    resource.totalFoodInput +
    resource.totalGeyserInput
  );
}

function getTotalOutput(resource: IResource) {
  return (
    resource.totalDupeOutput +
    resource.totalBuildingOutput +
    resource.totalPlantOutput +
    resource.totalFoodOutput +
    resource.totalGeyserOutput
  );
}
