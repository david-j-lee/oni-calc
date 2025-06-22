import IBuilding from '../interfaces/IBuilding';
import { IGameMode } from '../interfaces/IGameMode';
import IResource from '../interfaces/IResource';
import { getPowerCapacity, getResourcesCapacity } from '../utils/capacityUtils';
import { getSortedArray } from '../utils/commonUtils';
import {
  getBuildingsPowerGeneration,
  getBuildingsPowerUsage,
} from '../utils/powerUtils';
import IOVariantsBase from './IOVariantsBase';

export default abstract class IOBuildings extends IOVariantsBase {
  public static override key = 'buildings';

  public static setBuildingsLayout(layout: 'grid' | 'table') {
    const newLayout = layout === 'grid' ? 'table' : 'grid';
    localStorage.setItem('layout', newLayout);
    return {
      buildingsLayout: newLayout,
    };
  }

  public static sort(
    entities: IBuilding[],
    currentOrderBy: string,
    orderBy: keyof IBuilding,
    order: string,
  ) {
    const newOrder =
      currentOrderBy === orderBy && order === 'desc' ? 'asc' : 'desc';
    return {
      buildings: getSortedArray<IBuilding>(entities, orderBy, newOrder),
      buildingsOrderBy: orderBy,
      buildingsOrder: newOrder,
    };
  }

  public static override setUtilization(
    gameMode: IGameMode,
    entities: IBuilding[],
    resources: IResource[],
    name: string,
    utilization: number,
  ) {
    const results = super.setUtilization(
      gameMode,
      entities,
      resources,
      name,
      utilization,
    );
    const buildings = results.buildings as IBuilding[];
    return {
      ...results,
      powerGeneration: getBuildingsPowerGeneration(buildings),
      powerUsage: getBuildingsPowerUsage(buildings),
      powerCapacity: getPowerCapacity(buildings),
      resourcesCapacity: getResourcesCapacity(buildings),
    };
  }

  public static override setVariantUtilization(
    gameMode: IGameMode,
    buildings: IBuilding[],
    resources: IResource[],
    name: string,
    variantUtilizations: number[],
  ) {
    const results = super.setVariantUtilization(
      gameMode,
      buildings,
      resources,
      name,
      variantUtilizations,
    );
    const updatedBuildings = results.buildings as IBuilding[];
    return {
      ...results,
      powerGeneration: getBuildingsPowerGeneration(updatedBuildings),
      powerUsage: getBuildingsPowerUsage(updatedBuildings),
      powerCapacity: getPowerCapacity(updatedBuildings),
      resourcesCapacity: getResourcesCapacity(updatedBuildings),
    };
  }

  public static override setQuantity(
    gameMode: IGameMode,
    entities: IBuilding[],
    resources: IResource[],
    name: string,
    quantity: number,
  ) {
    const results = super.setQuantity(
      gameMode,
      entities,
      resources,
      name,
      quantity,
    );
    const buildings = results.buildings as IBuilding[];
    return {
      ...results,
      powerGeneration: getBuildingsPowerGeneration(buildings),
      powerUsage: getBuildingsPowerUsage(buildings),
      powerCapacity: getPowerCapacity(buildings),
      resourcesCapacity: getResourcesCapacity(buildings),
    };
  }
}
