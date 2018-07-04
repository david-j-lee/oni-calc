import {
  GET_DATA,
  SET_BUILDING_QUANTITY,
  SORT_RESOURCE_USAGE,
  GET_THEME,
  SET_THEME,
  CLEAR_BUILDING_QUANTITIES,
} from "../constants/actionConstants";

const initialState = {
  buildings: [],
  resources: [],
  resourcesOrderBy: 'name',
  resourcesOrder: 'asc',
  theme: {},
  powerUsage: 0,
  powerGeneration: 0,
  powerCapacity: 0,
  resourcesCapacity: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      const getBuildings = getBuildingQuantities(
        action.payload.buildings, action.payload.quantities);
      const getResources = updateResourceUsage(
        action.payload.resources, getBuildings);
      return {
        ...state,
        buildings: getBuildings,
        resources: getResources,
        powerGeneration: getBuildingsPowerGeneration(getBuildings),
        powerUsage: getBuildingsPowerUsage(getBuildings),
        powerCapacity: getPowerCapacity(getBuildings),
        resourcesCapacity: getResourcesCapacity(getBuildings),
      }
    case SORT_RESOURCE_USAGE:
      const order = state.resourcesOrderBy === action.payload
        && state.resourcesOrder === 'desc' ? 'asc' : 'desc';
      return {
        ...state,
        resourcesOrderBy: action.payload,
        resourcesOrder: order,
        resources: getSortedResources(
          action.payload, order, state.resources)
      }
    case SET_BUILDING_QUANTITY:
      const setBuildings = setBuildingsQuantity(state.buildings, action.payload);
      const setResources = updateResourceUsage(state.resources, setBuildings);
      return {
        ...state,
        buildings: setBuildings,
        resources: setResources,
        powerGeneration: getBuildingsPowerGeneration(setBuildings),
        powerUsage: getBuildingsPowerUsage(setBuildings),
        powerCapacity: getPowerCapacity(setBuildings),
        resourcesCapacity: getResourcesCapacity(setBuildings),
      }
    case CLEAR_BUILDING_QUANTITIES:
      return {
        ...state,
        buildings: clearBuildingQuantities(state.buildings),
        resources: getClearedResources(state.resources),
        powerGeneration: 0,
        powerUsage: 0,
        resourcesCapacity: 0,
        powerCapacity: 0,
      }
    case GET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
}

function getBuildingQuantities(buildings, quantities) {
  if (quantities) {
    return buildings.map(building => {
      const quantity = quantities.filter(q => {
        return q.name === building.name
      });
      return {
        ...building,
        quantity:
          quantity[0] !== undefined && quantity[0].quantity !== undefined
            ? quantity[0].quantity : 0,
      }
    });
  } else {
    return buildings.map(building => { return { ...building, quantity: 0 } });
  }
}

function saveBuildingQuantities(buildings) {
  localStorage.setItem(
    "quantities",
    JSON.stringify(buildings.map(b => {
      return { name: b.name, quantity: b.quantity ? b.quantity : 0 }
    })));
}

function getSortedResources(orderBy, order, resources) {
  return order === 'desc'
    ? [...resources].sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : [...resources].sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
}

function setBuildingsQuantity(buildings, newBuilding) {
  const newBuildings = [...buildings.map(building => {
    if (building.name === newBuilding.name) {
      return newBuilding;
    } else {
      return building;
    }
  })];
  saveBuildingQuantities(newBuildings);
  return newBuildings;
}

function clearBuildingQuantities(buildings) {
  const clearedBuildings = [...buildings.map(building => {
    return { ...building, quantity: 0 };
  })];
  saveBuildingQuantities(clearedBuildings);
  return clearedBuildings;
}

function updateResourceUsage(resources, buildings) {
  return resources.map(resource => {
    resource.inputs = getBuildingsIO(buildings, resource, 'inputs');
    resource.outputs = getBuildingsIO(buildings, resource, 'outputs');
    resource.totalInput = getIOTotal(resource.inputs);
    resource.totalOutput = getIOTotal(resource.outputs);
    resource.totalIO = resource.totalOutput - resource.totalInput;
    resource.unitOfMeasure = 'g/s';
    // resource.totalInput = inputs ? inputs.reduce((a, b) => { a.value + b.value }, 0) : 0;
    return resource;
  })
}

function getClearedResources(resources) {
  return resources.map(resource => {
    resource.totalInput = 0;
    resource.totalOutput = 0;
    resource.totalIO = 0;
    return resource;
  });
}

function getBuildingsIO(buildings, resource, type) {
  return buildings
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

function getBuildingsPowerUsage(buildings) {
  return buildings
    .map(building =>
      (building.power.usage !== undefined ? building.power.usage : 0) *
      (building.quantity !== undefined ? building.quantity : 0))
    .reduce((a, b) => a + b);
}

function getBuildingsPowerGeneration(buildings) {
  return buildings
    .map(building =>
      (building.power.generation !== undefined ? building.power.generation : 0) *
      (building.quantity !== undefined ? building.quantity : 0))
    .reduce((a, b) => a + b);
}

function getResourcesCapacity(buildings) {
  return buildings
    .map(building =>
      (building.capacity.resources.value !== undefined ? building.capacity.resources.value : 0) *
      (building.quantity !== undefined ? building.quantity : 0))
    .reduce((a, b) => a + b);
}

function getPowerCapacity(buildings) {
  return buildings
    .map(building =>
      (building.capacity.power.value !== undefined ? building.capacity.power.value : 0) *
      (building.quantity !== undefined ? building.quantity : 0))
    .reduce((a, b) => a + b);
}

function getIOTotal(ios) {
  if (ios.length > 0) {
    return ios
      .map(io => io.valueExtended)
      .reduce((a, b) => a + b);
  } else {
    return 0;
  }
}

function getStandardIO(io) {
  // convert to standard, currently grams per second
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