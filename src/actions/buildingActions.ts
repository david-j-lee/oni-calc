import IState from '../interfaces/IState';
import {
  clearBuildingInputs,
  setBuildingQuantity,
  setBuildingsLayout,
  setBuildingUtilization,
  setBuildingVariantUtilization,
  sortBuildings,
} from '../utils/buildingUtils';

export const buildingActions = {
  setBuildingsLayout() {
    return (state: IState) => {
      return {
        ...state,
        ...setBuildingsLayout(state.buildingsLayout),
      };
    };
  },
  collapseBuildingPanels() {
    return (state: IState) => {
      return {
        ...state,
        collapseBuildingPanels: true,
        collapseBuildingPanelsTrigger: state.collapseBuildingPanelsTrigger + 1,
      };
    };
  },
  expandBuildingPanels() {
    return (state: IState) => {
      return {
        ...state,
        collapseBuildingPanels: false,
        collapseBuildingPanelsTrigger: state.collapseBuildingPanelsTrigger - 1,
      };
    };
  },
  setBuildingQuantity(name: string, quantity: number) {
    return (state: IState) => {
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
    return (state: IState) => {
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
  setBuildingVariantUtilization(name: string, variantUtilizations: number[]) {
    return (state: IState) => {
      return {
        ...state,
        ...setBuildingVariantUtilization(
          state.resources,
          state.buildings,
          name,
          variantUtilizations,
        ),
      };
    };
  },
  sortBuildings(key: string) {
    return (state: IState) => {
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
    return (state: IState) => {
      return {
        ...state,
        ...clearBuildingInputs(state.resources, state.buildings),
      };
    };
  },
};
