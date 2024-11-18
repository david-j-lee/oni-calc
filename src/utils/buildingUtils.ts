import IBuilding, { IBuildingIO } from '../interfaces/IBuilding';
import IGameModeValue from '../interfaces/IGameModeValue';
import IBuildingInput from './../interfaces/IBuildingInput';
import IIO from './../interfaces/IIO';
import IResource from './../interfaces/IResource';
import { getPowerCapacity, getResourcesCapacity } from './capacityUtils';
import { getSortedArray, getStandardIO } from './commonUtils';
import {
  getBuildingsPowerGeneration,
  getBuildingsPowerUsage,
} from './powerUtils';
import { updateResourcesWithBuildings } from './resourceUtils';

export const setBuildingsLayout = (layout: 'grid' | 'table') => {
  const newLayout = layout === 'grid' ? 'table' : 'grid';
  localStorage.setItem('layout', newLayout);
  return {
    buildingsLayout: newLayout,
  };
};

export const setBuildingQuantity = (
  resources: IResource[],
  buildings: IBuilding[],
  name: string,
  quantity: number,
) => {
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
  resources: IResource[],
  buildings: IBuilding[],
  name: string,
  utilization: number,
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

export const setBuildingVariantUtilization = (
  resources: IResource[],
  buildings: IBuilding[],
  name: string,
  variantUtilizations: number[],
) => {
  const newBuildings = updateBuildingVariantUtilization(
    buildings,
    name,
    variantUtilizations,
  );
  const newResources = updateResourcesWithBuildings(resources, newBuildings);
  return {
    buildings: newBuildings,
    resources: newResources,
    powerGeneration: getBuildingsPowerGeneration(newBuildings),
    powerUsage: getBuildingsPowerUsage(newBuildings),
  };
};

export const clearBuildingInputs = (
  resources: IResource[],
  buildings: IBuilding[],
) => {
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

export const sortBuildings = (
  buildings: IBuilding[],
  currentOrderBy: string,
  orderBy: string,
  order: string,
) => {
  const newOrder =
    currentOrderBy === orderBy && order === 'desc' ? 'asc' : 'desc';
  return {
    buildings: getSortedArray(buildings, orderBy, newOrder),
    buildingsOrderBy: orderBy,
    buildingsOrder: newOrder,
  };
};

// -------------------------------------------------------------------

export function getBuildings(
  buildings: IBuilding[],
  inputs: IBuildingInput[],
): IBuilding[] {
  if (inputs) {
    return updateBuildingsWithInputs(buildings, inputs);
  } else {
    return getBuildingsWithDefaultInputs(buildings);
  }
}

function getBuildingsWithDefaultInputs(buildings: IBuilding[]): IBuilding[] {
  return buildings.map((building) => ({
    ...building,
    quantity: 0,
    utilization: building.hasConsistentIO ? 0 : 100,
    variantUtilizations:
      building.variants?.map((_variant, index) => (index === 0 ? 100 : 0)) ??
      [],
  }));
}

function getIOFromVariantUtilizations(
  building: IBuilding,
  variantUtilizations?: number[],
): { inputs: IBuildingIO[]; outputs: IBuildingIO[] } {
  // Get from the first if there are no variant utilizations
  if (
    building.variants &&
    (!variantUtilizations || variantUtilizations.length === 0)
  ) {
    const firstVariant = building.variants[0];
    return {
      inputs:
        firstVariant.inputs?.map((input) => ({
          ...input,
          valueExtended: getExtendedValue(
            building.quantity,
            building.utilization,
            100,
            getStandardIO(input).value,
          ),
          utilization: 100,
        })) ?? [],
      outputs:
        firstVariant.outputs?.map((output) => ({
          ...output,
          valueExtended: getExtendedValue(
            building.quantity,
            building.utilization,
            100,
            getStandardIO(output).value,
          ),
          utilization: 100,
        })) ?? [],
    };
  }

  // If there are variantUtilizations, construct the inputs and outputs from
  // them.
  const inputs: IBuildingIO[] = [];
  const outputs: IBuildingIO[] = [];

  variantUtilizations?.forEach((utilization, index) => {
    if (building.variants && utilization > 0) {
      const variant = building.variants[index];
      variant.inputs?.forEach((input) =>
        inputs.push({
          ...input,
          valueExtended: getExtendedValue(
            building.quantity,
            building.utilization,
            utilization,
            getStandardIO(input).value,
          ),
          utilization,
        }),
      );
      variant.outputs?.forEach((output) =>
        outputs.push({
          ...output,
          valueExtended: getExtendedValue(
            building.quantity,
            building.utilization,
            utilization,
            getStandardIO(output).value,
          ),
          utilization,
        }),
      );
    }
  });

  return { inputs, outputs };
}

function updateBuildingsWithInputs(
  buildings: IBuilding[],
  inputs: IBuildingInput[],
): IBuilding[] {
  return buildings.map((building) => {
    const input: IBuildingInput | undefined = inputs.find(
      (i) => i.name === building.name,
    );

    const variantUtilizations =
      input && input.variantUtilizations && input.variantUtilizations.length > 0
        ? input.variantUtilizations
        : (building.variants?.map((_variant, index) =>
            index === 0 ? 100 : 0,
          ) ?? []);

    const { inputs: variantInputs, outputs: variantOutputs } =
      getIOFromVariantUtilizations(building, input?.variantUtilizations);

    if (input === undefined) {
      return {
        ...building,
        quantity: 0,
        utilization: building.hasConsistentIO ? 0 : 100,
        variantUtilizations,
        inputs: variantInputs ?? [],
        outputs: variantOutputs ?? [],
      };
    } else {
      return {
        ...building,
        quantity: input.quantity ?? 0,
        utilization: input.utilization
          ? input.utilization
          : building.hasConsistentIO
            ? 0
            : 100,
        variantUtilizations,
        inputs: variantInputs ?? [],
        outputs: variantOutputs ?? [],
      };
    }
  });
}

export function getBuildingsWithClearedInputs(
  buildings: IBuilding[],
): IBuilding[] {
  const newBuildings = getBuildingsWithDefaultInputs(buildings);
  saveToLocalStorage(newBuildings);
  return newBuildings;
}

export function getBuildingsInputsForResource(
  buildings: IBuilding[],
  resourceName: string,
) {
  return getBuildingsIOsForResource(buildings, 'inputs', resourceName);
}

export function getBuildingsOutputsForResource(
  buildings: IBuilding[],
  resourceName: string,
) {
  return getBuildingsIOsForResource(buildings, 'outputs', resourceName);
}

function getBuildingsIOsForResource(
  buildings: IBuilding[],
  type: string,
  resourceName: string,
) {
  if (type !== 'inputs' && type !== 'outputs') {
    throw new Error('Type must be inputs or outputs');
  }

  const newBuildings = buildings.filter((building) => building.quantity > 0);
  if (newBuildings.length === 0) return [];

  return newBuildings
    .map((building) => getBuildingIOs(building, type, resourceName))
    .reduce((a, b) => a.concat(b), []);
}

function getBuildingIOs(
  building: IBuilding,
  type: keyof IBuilding,
  resourceName: string,
): IBuildingIO[] {
  if (building[type] === undefined) return [];

  const ios = (building[type] as IBuildingIO[]).filter(
    (io: IIO) => io.name === resourceName,
  );

  if (ios.length === 0) return [];

  return ios.map((io) => {
    const standardIO = getStandardIO(io);
    return {
      ...io,
      building,
      valueExtended: getExtendedValue(
        building.quantity,
        building.utilization,
        io.utilization,
        standardIO.value,
      ),
      rate: standardIO.rate,
    };
  });
}

function getExtendedValue(
  quantity: number,
  utilization: number,
  variantUtilization: number,
  value: number | IGameModeValue,
) {
  return (
    quantity *
    (value as number) *
    (utilization / 100) *
    (variantUtilization / 100)
  );
}

export function updateBuildingQuantity(
  buildings: IBuilding[],
  name: string,
  quantity: number,
) {
  const newBuildings = buildings.map((building) => {
    if (building.name === name) {
      return {
        ...building,
        quantity: building.name === name ? quantity : building.quantity,
      };
    } else {
      return building;
    }
  });
  saveToLocalStorage(newBuildings);
  return newBuildings;
}

export function updateBuildingUtilization(
  buildings: IBuilding[],
  name: string,
  utilization: number,
) {
  const newBuildings = buildings.map((building) => ({
    ...building,
    utilization: building.name === name ? utilization : building.utilization,
  }));
  saveToLocalStorage(newBuildings);
  return newBuildings;
}

export function updateBuildingVariantUtilization(
  buildings: IBuilding[],
  name: string,
  variantUtilizations: number[],
) {
  const newBuildings = buildings.map((building) => {
    if (building.name !== name) {
      return building;
    }
    const { inputs, outputs } = getIOFromVariantUtilizations(
      building,
      variantUtilizations,
    );
    return { ...building, inputs, outputs, variantUtilizations };
  });
  saveToLocalStorage(newBuildings);
  return newBuildings;
}

function saveToLocalStorage(buildings: IBuilding[]) {
  localStorage.setItem(
    'buildings',
    JSON.stringify(
      buildings.map((building) => ({
        name: building.name,
        quantity: building.quantity ? building.quantity : 0,
        utilization: building.utilization ? building.utilization : 100,
        variantUtilizations: building.variantUtilizations
          ? building.variantUtilizations
          : [],
      })),
    ),
  );
}
