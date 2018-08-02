import { IO } from './../interfaces/io.interface';
import { Building } from '../interfaces/building.interface';
import { BuildingInput } from './../interfaces/building-input.interface';

import { getStandardIO } from './commonUtils';

export function getBuildings(
  buildings: Array<Building>,
  inputs: Array<BuildingInput>,
): Array<Building> {
  if (inputs) {
    return updateBuildingsWithInputs(buildings, inputs);
  } else {
    return getBuildingsWithDefaultInputs(buildings);
  }
}

function getBuildingsWithDefaultInputs(
  buildings: Array<Building>,
): Array<Building> {
  return buildings.map(building => ({
    ...building,
    quantity: 0,
    utilization: building.hasConsistentIO ? 0 : 100,
  }));
}

function updateBuildingsWithInputs(
  buildings: Array<Building>,
  inputs: Array<BuildingInput>,
): Array<Building> {
  return buildings.map(building => {
    const input: BuildingInput | undefined = inputs.find(
      i => i.name === building.name,
    );
    if (input === undefined) {
      return { ...building, quantity: 0, utilization: 0 };
    } else {
      return {
        ...building,
        quantity: input.quantity || 0,
        utilization: input.utilization
          ? input.utilization
          : building.hasConsistentIO
            ? 0
            : 100,
      };
    }
  });
}

export function getBuildingsWithClearedInputs(
  buildings: Array<Building>,
): Array<Building> {
  const newBuildings = getBuildingsWithDefaultInputs(buildings);
  saveToLocalStorage(newBuildings);
  return newBuildings;
}

export function getBuildingsInputsForResource(
  buildings: Array<Building>,
  resourceName: string,
) {
  return getBuildingsIOsForResource(buildings, 'inputs', resourceName);
}

export function getBuildingsOutputsForResource(
  buildings: Array<Building>,
  resourceName: string,
) {
  return getBuildingsIOsForResource(buildings, 'outputs', resourceName);
}

function getBuildingsIOsForResource(
  buildings: Array<Building>,
  type: string,
  resourceName: string,
) {
  if (type !== 'inputs' && type !== 'outputs') {
    throw new Error('Type must be inputs or outputs');
  }

  const newBuildings = buildings.filter(building => building.quantity > 0);
  if (newBuildings.length === 0) return [];

  return newBuildings
    .map(building => getBuildingIOs(building, type, resourceName))
    .reduce((a, b) => a.concat(b));
}

function getBuildingIOs(
  building: Building,
  type: string,
  resourceName: string,
) {
  if (building[type] === undefined) return [];

  const ios = building[type].filter((io: IO) => io.name === resourceName);
  if (ios.length === 0) return [];

  return ios.map((io: IO) => {
    const standardIO = getStandardIO(io);
    return {
      ...io,
      building: building,
      valueExtended: getExtendedValue(
        building.quantity,
        building.utilization,
        standardIO.value,
      ),
      rate: standardIO.rate,
    };
  });
}

function getExtendedValue(
  quantity: number,
  utilization: number,
  value: number,
) {
  return (quantity * value * utilization) / 100;
}

export function updateBuildingQuantity(
  buildings: Array<Building>,
  name: string,
  quantity: number,
) {
  const newBuildings = buildings.map(building => ({
    ...building,
    quantity: building.name === name ? quantity : building.quantity,
  }));
  saveToLocalStorage(newBuildings);
  return newBuildings;
}

export function updateBuildingUtilization(
  buildings: Array<Building>,
  name: string,
  utilization: number,
) {
  const newBuildings = buildings.map(building => ({
    ...building,
    utilization: building.name === name ? utilization : building.utilization,
  }));
  saveToLocalStorage(newBuildings);
  return newBuildings;
}

function saveToLocalStorage(buildings: Array<Building>) {
  localStorage.setItem(
    'buildings',
    JSON.stringify(
      buildings.map(building => ({
        name: building.name,
        quantity: building.quantity ? building.quantity : 0,
        utilization: building.utilization ? building.utilization : 100,
      })),
    ),
  );
}
