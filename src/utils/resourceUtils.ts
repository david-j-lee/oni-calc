import IBuilding from '../interfaces/IBuilding';
import { IGameMode } from '../interfaces/IGameMode';
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
  orderBy: keyof IResource,
  order: string,
) => {
  const newOrder =
    currentOrderBy === orderBy && order === 'desc' ? 'asc' : 'desc';
  return {
    resources: getSortedArray<IResource>(resources, orderBy, newOrder),
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
  gameMode,
  resources,
  plants,
  dupes,
  buildings,
  critters,
  geysers,
}: {
  gameMode: IGameMode;
  resources: IResourceBase[];
  plants: IPlant[];
  dupes: IDupes;
  buildings: IBuilding[];
  critters: IIOEntity[];
  geysers: IGeysers;
}) {
  return resources.map((resource: IResourceBase) => {
    const updatedResource = {
      ...resource,
      ...resourceDupes(gameMode, resource, dupes),
      ...resourceGeysers(resource, geysers),
      subtotals: {
        buildings: IOBuildings.getResourceData(gameMode, buildings, resource),
        plants: IOPlants.getResourceData(gameMode, plants, resource),
        critters: IOCritters.getResourceData(gameMode, critters, resource),
      },
    } as IResource;

    updatedResource.totalInput = getTotalInput(updatedResource);
    updatedResource.totalOutput = getTotalOutput(updatedResource);

    return {
      ...updatedResource,
      total: updatedResource.totalOutput - updatedResource.totalInput,
    };
  });
}

export function updateResourcesWithDupes(
  gameMode: IGameMode,
  resources: IResource[],
  dupes: IDupes,
) {
  return resources.map((resource) => {
    const updatedResource = {
      ...resource,
      ...resourceDupes(gameMode, resource, dupes),
    } as IResource;
    updatedResource.totalInput = getTotalInput(updatedResource);
    updatedResource.totalOutput = getTotalOutput(updatedResource);

    return {
      ...updatedResource,
      total: updatedResource.totalOutput - updatedResource.totalInput,
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
      total: updatedResource.totalOutput - updatedResource.totalInput,
    };
  });
}

function resourceDupes(
  gameMode: IGameMode,
  resource: IResourceBase,
  dupes: IDupes,
) {
  const dupeInputs = getDupesInputsForResource(gameMode, dupes, resource.name);
  const dupeOutputs = getDupesOutputsForResource(
    gameMode,
    dupes,
    resource.name,
  );
  const totalDupeInput = getIOTotal(dupeInputs as IIO[]);
  const totalDupeOutput = getIOTotal(dupeOutputs as IIO[]);

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
