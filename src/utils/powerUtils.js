export function getBuildingsPowerUsage(buildings) {
  const newBuildings = buildings.filter(
    building => building.power.usage > 0 && building.quantity > 0,
  );

  return {
    value: getPowerValue(newBuildings, 'usage'),
    buildings: newBuildings,
  };
}

export function getBuildingsPowerGeneration(buildings) {
  const newBuildings = buildings.filter(building => {
    return building.power.generation > 0 && building.quantity > 0;
  });

  return {
    value: getPowerValue(newBuildings, 'generation'),
    buildings: newBuildings,
  };
}

function getPowerValue(buildings, prop) {
  if (buildings.length === 0) return 0;

  return buildings
    .map(
      building =>
        ((building.power[prop] * building.utilization) / 100.0) *
        building.quantity,
    )
    .reduce((a, b) => a + b);
}
