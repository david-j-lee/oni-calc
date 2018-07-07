import {
  GET_DATA,
  SORT_BUILDINGS,
  SET_BUILDING_QUANTITY,
  SORT_RESOURCE_USAGE,
  GET_THEME,
  SET_THEME,
  CLEAR_BUILDING_QUANTITIES,
  SET_BUILDINGS_LAYOUT,
  SET_BUILDING_UTILIZATION,
} from "../constants/actionConstants";

import {
  getData,
  sortResourceUsage,
  sortBuildings,
  setBuildingsLayout,
  setBuildingQuantity,
  setBuildingUtilization,
  clearBuildingQuantities,
} from "../utils/reducerUtils";

const initialState = {
  buildings: [],
  buildingsLayout: 'grid',
  buildingsOrderBy: '',
  buildingOrder: 'desc',
  resources: [],
  resourcesOrderBy: 'name',
  resourcesOrder: 'asc',
  theme: {},
  powerUsage: {},
  powerGeneration: {},
  powerCapacity: {},
  resourcesCapacity: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        buildingsLayout: action.payload.layout,
        ...getData(
          action.payload.resources,
          action.payload.buildings,
          action.payload.inputs
        ),
      }
    case SET_BUILDINGS_LAYOUT:
      return {
        ...state,
        ...setBuildingsLayout(state.buildingsLayout),
      }
    case SORT_RESOURCE_USAGE:
      return {
        ...state,
        ...sortResourceUsage(
          state.resources,
          state.resourcesOrder,
          state.resourcesOrderBy,
          action.payload.orderBy,
        ),
      }
    case SORT_BUILDINGS:
      return {
        ...state,
        ...sortBuildings(
          state.buildings,
          state.buildingsOrder,
          state.buildingsOrderBy,
        )
      }
    case SET_BUILDING_QUANTITY:
      return {
        ...state,
        ...setBuildingQuantity(
          state.resources,
          state.buildings,
          action.payload.name,
          action.payload.quantity,
        )
      }
    case SET_BUILDING_UTILIZATION:
      return {
        ...state,
        ...setBuildingUtilization(
          state.buildings,
          action.payload.name,
          action.payload.utilization,
        )
      }
    case CLEAR_BUILDING_QUANTITIES:
      return {
        ...state,
        ...clearBuildingQuantities(
          state.resources,
          state.buildings,
        )
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
