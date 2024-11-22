import IBuilding from '../interfaces/IBuilding';
import IFood from '../interfaces/IFood';
import IGeysers from '../interfaces/IGeysers';
import IIO from '../interfaces/IIO';
import IIOEntity from '../interfaces/IIOEntity';
import IOBuildings from '../services/IOBuildings';
import IOCritters from '../services/IOCritters';
import IOPlants from '../services/IOPlants';
import IDupes from './../interfaces/IDupes';
import IPlant from './../interfaces/IPlant';
import IResource, { IResourceBase } from './../interfaces/IResource';
import {
  getIOTotal,
  getSortedArray,
  getTotalInput,
  getTotalOutput,
} from './commonUtils';
import {
  getDupesInputsForResource,
  getDupesOutputsForResource,
} from './dupeUtils';
import { getGeyserOutputs } from './geyserUtils';

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
    resource.total = 0;
    return resource;
  });
}

export function updateResources({
  resources,
  plants,
  dupes,
  buildings,
  critters,
  geysers,
}: {
  resources: IResourceBase[];
  plants: IPlant[];
  dupes: IDupes;
  buildings: IBuilding[];
  critters: IIOEntity[];
  food: IFood[];
  geysers: IGeysers;
}) {
  return resources.map((resource: IResourceBase) => {
    const updatedResource = {
      ...resource,
      ...resourceDupes(resource, dupes),
      ...resourceGeysers(resource, geysers),
      subtotals: {
        buildings: IOBuildings.getResourceData(buildings, resource),
        plants: IOPlants.getResourceData(plants, resource),
        critters: IOCritters.getResourceData(critters, resource),
      },
    } as IResource;

    updatedResource.totalInput = getTotalInput(updatedResource);
    updatedResource.totalOutput = getTotalOutput(updatedResource);

    return {
      ...updatedResource,
      total: updatedResource.totalOutput - updatedResource.totalInput,
      unitOfMeasure: 'g/s',
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
