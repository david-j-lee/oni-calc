export const getData = (resources, buildings, inputs) => {
  const _buildings = getBuildingsWithInputs(buildings, inputs);
  const _resources = updateResourceUsage(resources, _buildings);
  return {
    buildings: _buildings,
    resources: _resources,
    powerGeneration: getBuildingsPowerGeneration(_buildings),
    powerUsage: getBuildingsPowerUsage(_buildings),
    powerCapacity: getPowerCapacity(_buildings),
    resourcesCapacity: getResourcesCapacity(_buildings),
  }
}

export const setBuildingsLayout = (layout) => {
  const _layout = layout === "grid" ? "table" : "grid";
  localStorage.setItem("layout", _layout);
  return {
    buildingsLayout: _layout,
  };
}

export const sortResourceUsage = (
  resources, currentOrderBy, orderBy, order
) => {
  const _order = currentOrderBy === orderBy
    && order === 'desc' ? 'asc' : 'desc';
  return {
    resources: getSortedArray(resources, orderBy, _order),
    resourcesOrderBy: orderBy,
    resourcesOrder: _order,
  }
}

export const sortBuildings = (buildings, currentOrderBy, orderBy, order) => {
  const _order = currentOrderBy === orderBy
    && order === 'desc' ? 'asc' : 'desc';
  return {
    buildings: getSortedArray(buildings, orderBy, _order),
    buildingsOrderBy: orderBy,
    buildingsOrder: _order,
  }
}

export const setBuildingQuantity = (resources, buildings, name, quantity) => {
  const _buildings = updateBuildingQuantity(buildings, name, quantity);
  const _resources = updateResourceUsage(resources, _buildings);
  return {
    buildings: _buildings,
    resources: _resources,
    powerGeneration: getBuildingsPowerGeneration(_buildings),
    powerUsage: getBuildingsPowerUsage(_buildings),
    powerCapacity: getPowerCapacity(_buildings),
    resourcesCapacity: getResourcesCapacity(_buildings),
  }
}

export const setBuildingUtilization = (buildings, name, utilization) => {
  const _buildings = updateBuildingUtilization(buildings, name, utilization);
  return {
    buildings: _buildings,
    powerGeneration: getBuildingsPowerGeneration(_buildings),
    powerUsage: getBuildingsPowerUsage(_buildings),
  }
}

export const clearBuildingQuantities = (resources, buildings) => {
  return {
    resources: getClearedResources(resources),
    buildings: getClearedBuildings(buildings),
    powerGeneration: { value: 0, buildings: [] },
    powerUsage: { value: 0, buildings: [] },
    resourcesCapacity: { value: 0, buildings: [] },
    powerCapacity: { value: 0, buildings: [] },
  }
}

function getBuildingsWithInputs(buildings, inputs) {
  if (inputs) {
    return buildings.map(building => {

      const filterInputs = inputs.filter(q => {
        return q.name === building.name
      });

      if (filterInputs.length !== 0) {
        const input = filterInputs[0];
        const quantity = input.quantity !== undefined ? input.quantity : 0;
        const newBuilding = { ...building, quantity };

        if (newBuilding.power.unit !== undefined &&
          inputs.utilization !== undefined) {
          newBuilding.power.utilization = 100;
        } else {
          newBuilding.power.utilization = input.utilization;
        }

        return newBuilding;
      }

      return { ...building, quantity: 0 };
    });
  } else {
    return buildings.map(building => { return { ...building, quantity: 0 } });
  }
}

function updateResourceUsage(resources, buildings) {
  return resources.map(resource => {
    resource.inputs = getBuildingsIO(buildings, resource, 'inputs');
    resource.outputs = getBuildingsIO(buildings, resource, 'outputs');
    resource.totalInput = getIOTotal(resource.inputs);
    resource.totalOutput = getIOTotal(resource.outputs);
    resource.totalIO = resource.totalOutput - resource.totalInput;
    resource.unitOfMeasure = 'g/s';
    return resource;
  })
}

function getBuildingsIO(buildings, resource, type) {
  const filteredBuildings = buildings.filter(building => building.quantity > 0);
  return filteredBuildings.length === 0 ? [] :
    filteredBuildings
      .map(building => building[type].map(io => {

        const standardIO = getStandardIO(io);
        io.building = building;

        if (building.quantity) {
          io.valueExtended = parseFloat(building.quantity) * standardIO.value;
        } else {
          io.valueExtended = 0;
        }

        io.rate = standardIO.rate;

        return io;
      }))
      .reduce((a, b) => a.concat(b))
      .filter(output => output.name === resource.name);
}

function getIOTotal(ios) {
  if (ios.length > 0) {
    return ios.map(io => io.valueExtended).reduce((a, b) => a + b);
  } else {
    return 0;
  }
}

function getStandardIO(io) {
  let value = io.value;
  switch (io.unit) {
    case 'g':
      break;
    case 'mg':
      value = value * 0.001;
      break;
    case 'kg':
      value = value * 1000.0;
      break;
    default:
      value = 0.0;
      break;
  }
  let rate = io.rate;
  switch (io.rate) {
    case 'per second':
      break;
    default:
      io.rate = 'unknown';
      break;
  }
  return { value, rate };
}

function getSortedArray(array, orderBy, order) {
  return order === 'desc'
    ? [...array].sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : [...array].sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
}

// clear all inputs
function getClearedBuildings(buildings) {
  const clearedBuildings = [...buildings.map(building => {
    const clearedBuilding = { ...building, quantity: 0 };
    if (clearedBuilding.power.unit) {
      clearedBuilding.power.utilization = 100;
    }
    return clearedBuilding;
  })];
  saveData(clearedBuildings);
  return clearedBuildings;
}

function getClearedResources(resources) {
  return resources.map(resource => {
    resource.totalInput = 0;
    resource.totalOutput = 0;
    resource.totalIO = 0;
    return resource;
  });
}

// updates
function updateBuildingQuantity(buildings, name, quantity) {
  const _buildings = [...buildings.map(building => {
    if (building.name === name) {
      return { ...building, quantity };
    } else {
      return building;
    }
  })];
  saveData(_buildings);
  return _buildings;
}

function updateBuildingUtilization(buildings, name, utilization) {
  const _buildings = [...buildings.map(building => {
    if (building.name === name) {
      return { ...building, power: { ...building.power, utilization } };
    } else {
      return building;
    }
  })];
  saveData(_buildings);
  return _buildings;
}

// power
function getBuildingsPowerUsage(buildings) {
  const _buildings = buildings.filter(b => {
    return b.power.usage > 0 && b.quantity > 0;
  });
  if (_buildings.length > 0) {
    const value = _buildings.map(building => {
      const qty = building.quantity !== undefined ? building.quantity : 0;
      return building.power.usage * building.power.utilization / 100.0 * qty;
    }).reduce((a, b) => a + b);
    return { value: value, buildings: _buildings };
  }
  return { value: 0, buildings: [] };
}

function getBuildingsPowerGeneration(buildings) {
  const _buildings = buildings.filter(building => {
    return building.power.generation > 0 && building.quantity > 0;
  });
  if (_buildings.length > 0) {
    const value = _buildings.map(b => {
      const qty = b.quantity !== undefined ? b.quantity : 0;
      return b.power.generation * b.power.utilization / 100.0 * qty;
    }).reduce((a, b) => a + b);
    return { value: value, buildings: _buildings };
  }
  return { value: 0, buildings: [] };
}

// capacity
function getResourcesCapacity(buildings) {
  const _buildings = buildings.filter(building => {
    return building.capacity.resources.value > 0 && building.quantity > 0;
  })
  if (_buildings.length > 0) {
    const value = _buildings.map(building => {
      const qty = building.quantity !== undefined ? building.quantity : 0;
      return building.capacity.resources.value * qty;
    }).reduce((a, b) => a + b);
    return { value: value, buildings: _buildings };
  } else {
    return { value: 0, buildings: [] };
  }
}

function getPowerCapacity(buildings) {
  const _buildings = buildings.filter(building => {
    return building.capacity.power.value > 0 && building.quantity > 0;
  })
  if (_buildings.length > 0) {
    const value = _buildings.map(building => {
      const qty = building.quantity !== undefined ? building.quantity : 0;
      return building.capacity.power.value * qty;
    }).reduce((a, b) => a + b);
    return { value: value, buildings: _buildings };
  }
  return { value: 0, buildings: [] };
}

// save
function saveData(buildings) {
  localStorage.setItem(
    "inputs",
    JSON.stringify(
      buildings.map(b => {
        return {
          name: b.name,
          quantity: b.quantity ? b.quantity : 0,
          utilization: b.power.utilization ? b.power.utilization : 100,
        }
      })
    )
  );
}
