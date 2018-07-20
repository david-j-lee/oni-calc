export function getResourcesCapacity(buildings) {
  const newBuildings = buildings.filter(
    building => building.capacity.resources.value > 0 && building.quantity > 0,
  );
  return {
    value: getCapacityValue(newBuildings, 'resources'),
    buildings: newBuildings,
  };
}

export function getPowerCapacity(buildings) {
  const newBuildings = buildings.filter(
    building => building.capacity.power.value > 0 && building.quantity > 0,
  );
  return {
    value: getCapacityValue(newBuildings, 'power'),
    buildings: newBuildings,
  };
}

function getCapacityValue(buildings, prop) {
  if (buildings.length === 0) return 0;

  return buildings
    .map(building => (building.capacity[prop].value || 0) * building.quantity)
    .reduce((a, b) => a + b);
}
