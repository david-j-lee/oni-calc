import IState from '../interfaces/IState';
import IOBuildings from '../services/IOBuildings';

export const buildingActions = {
  setBuildingsLayout() {
    return (state: IState) => {
      return {
        ...state,
        ...IOBuildings.setBuildingsLayout(state.buildingsLayout),
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
        ...IOBuildings.setQuantity(
          state.buildings,
          state.resources,
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
        ...IOBuildings.setUtilization(
          state.buildings,
          state.resources,
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
        ...IOBuildings.setVariantUtilization(
          state.buildings,
          state.resources,
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
        ...IOBuildings.sort(
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
        ...IOBuildings.clearInputs(state.buildings, state.resources),
      };
    };
  },
};
