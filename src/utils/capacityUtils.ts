import IBuilding from '../interfaces/IBuilding';

export function getResourcesCapacity(buildings: IBuilding[]) {
  const newBuildings = buildings.filter(
    (building) =>
      building.capacity &&
      building.capacity.resources &&
      building.capacity.resources.value > 0 &&
      building.quantity > 0,
  );
  return {
    value: getCapacityValue(newBuildings, 'resources'),
    buildings: newBuildings,
  };
}

export function getPowerCapacity(buildings: IBuilding[]) {
  const newBuildings = buildings.filter(
    (building) =>
      building.capacity &&
      building.capacity.power &&
      building.capacity.power.value > 0 &&
      building.quantity > 0,
  );
  return {
    value: getCapacityValue(newBuildings, 'power'),
    buildings: newBuildings,
  };
}

function getCapacityValue(buildings: IBuilding[], prop: 'power' | 'resources') {
  if (buildings.length === 0) return 0;

  return buildings
    .map((building) => (building.capacity[prop].value || 0) * building.quantity)
    .reduce((a, b) => a + b, 0);
}
