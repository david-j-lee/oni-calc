import {
  clearBuildingInputs,
  setBuildingQuantity,
  setBuildingsLayout,
  setBuildingUtilization,
  sortBuildings,
} from '../utils/buildingUtils';

export const buildingActions = {
  setBuildingsLayout() {
    return state => {
      return {
        ...state,
        ...setBuildingsLayout(state.buildingsLayout),
      };
    };
  },
  collapseBuildingPanels() {
    return state => {
      return {
        ...state,
        collapseBuildingPanels: true,
        collapseBuildingPanelsTrigger: state.collapseBuildingPanelsTrigger + 1,
      };
    };
  },
  expandBuildingPanels() {
    return state => {
      return {
        ...state,
        collapseBuildingPanels: false,
        collapseBuildingPanelsTrigger: state.collapseBuildingPanelsTrigger - 1,
      };
    };
  },
  setBuildingQuantity(name: string, quantity: number) {
    return state => {
      return {
        ...state,
        ...setBuildingQuantity(
          state.resources,
          state.buildings,
          name,
          quantity,
        ),
      };
    };
  },
  setBuildingUtilization(name: string, utilization: number) {
    return state => {
      return {
        ...state,
        ...setBuildingUtilization(
          state.resources,
          state.buildings,
          name,
          utilization,
        ),
      };
    };
  },
  sortBuildings(key: string) {
    return state => {
      return {
        ...state,
        ...sortBuildings(
          state.buildings,
          state.buildingsOrderBy,
          key,
          state.buildingsOrder,
        ),
      };
    };
  },
  clearBuildingInputs() {
    return state => {
      return {
        ...state,
        ...clearBuildingInputs(state.resources, state.buildings),
      };
    };
  },
};
