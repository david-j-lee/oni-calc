import {
  GET_DATA,
  SORT_BUILDINGS,
  SET_BUILDING_QUANTITY,
  SORT_RESOURCES,
  GET_THEME,
  SET_THEME,
  CLEAR_BUILDING_INPUTS,
  SET_BUILDINGS_LAYOUT,
  SET_BUILDING_UTILIZATION,
  SET_DUPES_TOTAL_QUANTITY,
  SET_DUPE_TRAIT_QUANTITY,
  SET_TAB_INDEX,
  SET_DUPE_WASTE,
  SET_FOOD_QUANTITY,
  ADD_GEYSER,
  DELETE_GEYSER,
  CLEAR_FOOD_INPUTS,
  CLEAR_GEYSER_INPUTS,
  CLEAR_DUPE_INPUTS,
} from '../constants/actionConstants';

import {
  getData,
  sortResources,
  sortBuildings,
  setBuildingsLayout,
  setBuildingQuantity,
  setBuildingUtilization,
  clearBuildingInputs,
  setDupesQuantity,
  setDupeTraitQuantity,
  setDupeWaste,
  setFoodQuantity,
  addGeyser,
  deleteGeyser,
  clearFoodInputs,
  clearGeyserInputs,
  clearDupeInputs,
} from '../utils/reducerUtils';

const initialState = {
  tabIndex: 0,
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
  dupes: {},
  food: [],
  geysers: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    // common
    case GET_DATA:
      return {
        ...state,
        buildingsLayout: action.payload.layout,
        ...getData({
          resources: action.payload.resources,
          plants: action.payload.plants,
          dupes: action.payload.dupes,
          dupeInputs: action.payload.dupeInputs,
          buildings: action.payload.buildings,
          buildingInputs: action.payload.buildingInputs,
          food: action.payload.food,
          foodInputs: action.payload.foodInputs,
          geysers: action.payload.geysers,
          geyserInputs: action.payload.geyserInputs,
        }),
      };
    // ui
    case SET_TAB_INDEX:
      return {
        ...state,
        tabIndex: action.payload,
      };
    case GET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case SET_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case SET_BUILDINGS_LAYOUT:
      return {
        ...state,
        ...setBuildingsLayout(state.buildingsLayout),
      };
    // resources
    case SORT_RESOURCES:
      return {
        ...state,
        ...sortResources(
          state.resources,
          state.resourcesOrder,
          state.resourcesOrderBy,
          action.payload.orderBy,
        ),
      };
    // dupes
    case SET_DUPES_TOTAL_QUANTITY:
      return {
        ...state,
        ...setDupesQuantity(state.resources, state.dupes, action.payload),
      };
    case SET_DUPE_TRAIT_QUANTITY:
      return {
        ...state,
        ...setDupeTraitQuantity(
          state.resources,
          state.dupes,
          action.payload.name,
          action.payload.quantity,
        ),
      };
    case SET_DUPE_WASTE:
      return {
        ...state,
        ...setDupeWaste(
          state.resources,
          state.dupes,
          action.payload.prop,
          action.payload.value,
        ),
      };
    case CLEAR_DUPE_INPUTS:
      return {
        ...state,
        ...clearDupeInputs(state.resources, state.dupes),
      };
    // buildings
    case SORT_BUILDINGS:
      return {
        ...state,
        ...sortBuildings(
          state.buildings,
          state.buildingsOrder,
          state.buildingsOrderBy,
        ),
      };
    case SET_BUILDING_QUANTITY:
      return {
        ...state,
        ...setBuildingQuantity(
          state.resources,
          state.buildings,
          action.payload.name,
          action.payload.quantity,
        ),
      };
    case SET_BUILDING_UTILIZATION:
      return {
        ...state,
        ...setBuildingUtilization(
          state.resources,
          state.buildings,
          action.payload.name,
          action.payload.utilization,
        ),
      };
    case CLEAR_BUILDING_INPUTS:
      return {
        ...state,
        ...clearBuildingInputs(state.resources, state.buildings),
      };
    // food
    case SET_FOOD_QUANTITY:
      return {
        ...state,
        ...setFoodQuantity(
          state.resources,
          state.plants,
          state.food,
          action.payload.name,
          action.payload.quantity,
        ),
      };
    case CLEAR_FOOD_INPUTS:
      return {
        ...state,
        ...clearFoodInputs(state.resources, state.plants, state.food),
      };
    // geysers
    case ADD_GEYSER:
      return {
        ...state,
        ...addGeyser(state.resources, state.geysers, action.payload),
      };
    case DELETE_GEYSER:
      return {
        ...state,
        ...deleteGeyser(state.resources, state.geysers, action.payload),
      };
    case CLEAR_GEYSER_INPUTS:
      return {
        ...state,
        ...clearGeyserInputs(state.resources, state.geysers),
      };
    default:
      return state;
  }
}
