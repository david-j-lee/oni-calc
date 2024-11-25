import IBuilding from '../interfaces/IBuilding';
import IResource from '../interfaces/IResource';
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
    buildings: IBuilding[],
    currentOrderBy: string,
    orderBy: string,
    order: string,
  ) {
    const newOrder =
      currentOrderBy === orderBy && order === 'desc' ? 'asc' : 'desc';
    return {
      buildings: getSortedArray(buildings, orderBy, newOrder),
      buildingsOrderBy: orderBy,
      buildingsOrder: newOrder,
    };
  }

  public static override setUtilization(
    buildings: IBuilding[],
    resources: IResource[],
    name: string,
    utilization: number,
  ) {
    const results = super.setUtilization(
      buildings,
      resources,
      name,
      utilization,
    );
    return {
      ...results,
      powerGeneration: getBuildingsPowerGeneration(
        results.buildings as IBuilding[],
      ),
      powerUsage: getBuildingsPowerUsage(results.buildings as IBuilding[]),
    };
  }

  public static override setVariantUtilization(
    buildings: IBuilding[],
    resources: IResource[],
    name: string,
    variantUtilizations: number[],
  ) {
    const results = super.setVariantUtilization(
      buildings,
      resources,
      name,
      variantUtilizations,
    );
    return {
      ...results,
      powerGeneration: getBuildingsPowerGeneration(
        results.buildings as IBuilding[],
      ),
      powerUsage: getBuildingsPowerUsage(results.buildings as IBuilding[]),
    };
  }
}
