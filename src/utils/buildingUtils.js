import { getStandardIO } from './commonUtils';

export function getBuildings(buildings, inputs) {
  if (inputs) {
    return updateBuildingsWithInputs(buildings, inputs);
  } else {
    return getBuildingsWithDefaultInputs(buildings);
  }
}

function getBuildingsWithDefaultInputs(buildings) {
  return buildings.map(building => ({
    ...building,
    quantity: 0,
    utilization: building.hasConsistentIO ? 100 : 0,
  }));
}

function updateBuildingsWithInputs(buildings, inputs) {
  return buildings.map(building => {
    const input = inputs.find(input => input.name === building.name);
    return {
      ...building,
      quantity: input ? input.quantity : 0,
      utilization: input
        ? input.utilization
        : building.hasConsistentIO
          ? 100
          : 0,
    };
  });
}

export function getClearedBuildings(buildings) {
  const newBuildings = getBuildingsWithDefaultInputs(buildings);
  saveToLocalStorage(newBuildings);
  return newBuildings;
}

export function getBuildingsInputsForResource(buildings, resourceName) {
  return getBuildingsIOsForResource(buildings, 'inputs', resourceName);
}

export function getBuildingsOutputsForResource(buildings, resourceName) {
  return getBuildingsIOsForResource(buildings, 'outputs', resourceName);
}

function getBuildingsIOsForResource(buildings, type, resourceName) {
  if (type !== 'inputs' && type !== 'outputs')
    throw new Error('Type must be inputs or outputs');

  return buildings
    .filter(building => building.quantity > 0)
    .map(building =>
      building[type].filter(io => io.name === resourceName).map(io => {
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
      }),
    )
    .reduce((a, b) => a.concat(b));
}

function getExtendedValue(quantity, utilization, value) {
  return (quantity * value * utilization) / 100;
}

export function updateBuildingQuantity(buildings, name, quantity) {
  const newBuildings = buildings.map(building => ({
    ...building,
    quantity: building.name === name ? quantity : building.quantity,
  }));
  saveToLocalStorage(newBuildings);
  return newBuildings;
}

export function updateBuildingUtilization(buildings, name, utilization) {
  const newBuildings = buildings.map(building => ({
    ...building,
    utilization: building.name === name ? utilization : building.utilization,
  }));
  saveToLocalStorage(newBuildings);
  return newBuildings;
}

function saveToLocalStorage(buildings) {
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
