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

import { getGeyserOutputs } from './geyserUtils';
import { getIOTotal } from './commonUtils';

export function getClearedResources(resources) {
  return resources.map(resource => {
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
}) {
  return resources.map(resource => {
    const updatedResource = {
      ...resource,
      ...resourceDupes(resource, dupes),
      ...resourceBuildings(resource, buildings),
      ...resourceFood(resource, food),
      ...resourcePlants(resource, plants),
      ...resourceGeysers(resource, geysers),
    };
    updatedResource.totalInput = getTotalInput(updatedResource);
    updatedResource.totalOutput = getTotalOutput(updatedResource);

    return {
      ...updatedResource,
      totalIO: updatedResource.totalOutput - updatedResource.totalInput,
      unitOfMeasure: 'g/s',
    };
  });
}

export function updateResourcesWithBuildings(resources, buildings) {
  return resources.map(resource => {
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

export function updateResourcesWithDupes(resources, dupes) {
  return resources.map(resource => {
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

export function updateResourcesWithFoodAndPlants(resources, plants, food) {
  return resources.map(resource => {
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

export function updateResourcesWithGeysers(resources, geysers) {
  return resources.map(resource => {
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

function resourceDupes(resource, dupes) {
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

function resourceBuildings(resource, buildings) {
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

function resourceFood(resource, food) {
  const foodInputs = getFoodInputsForResource(food, resource.name);
  const foodOutputs = [];
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

function resourcePlants(resource, plants) {
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

function resourceGeysers(resource, geysers) {
  const geyserInputs = [];
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

function getTotalInput(resource) {
  return (
    resource.totalDupeInput +
    resource.totalBuildingInput +
    resource.totalPlantInput +
    resource.totalFoodInput +
    resource.totalGeyserInput
  );
}

function getTotalOutput(resource) {
  return (
    resource.totalDupeOutput +
    resource.totalBuildingOutput +
    resource.totalPlantOutput +
    resource.totalFoodOutput +
    resource.totalGeyserOutput
  );
}
