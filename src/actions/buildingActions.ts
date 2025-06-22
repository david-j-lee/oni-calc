import IBuilding from '../interfaces/IBuilding';
import IState from '../interfaces/IState';
import IOBuildings from '../services/IOBuildings';

export const buildingActions = {
  setBuildingsLayout: () => {
    return (state: IState) => ({
      ...state,
      ...IOBuildings.setBuildingsLayout(state.buildingsLayout),
    });
  },
  collapseBuildingPanels: () => {
    return (state: IState) => ({
      ...state,
      collapseBuildingPanels: true,
      collapseBuildingPanelsTrigger: state.collapseBuildingPanelsTrigger + 1,
    });
  },
  expandBuildingPanels: () => {
    return (state: IState) => ({
      ...state,
      collapseBuildingPanels: false,
      collapseBuildingPanelsTrigger: state.collapseBuildingPanelsTrigger - 1,
    });
  },
  setBuildingQuantity: (name: string, quantity: number) => {
    return (state: IState) => ({
      ...state,
      ...IOBuildings.setQuantity(
        state.settings.gameMode,
        state.buildings,
        state.resources,
        name,
        quantity,
      ),
    });
  },
  setBuildingUtilization: (name: string, utilization: number) => {
    return (state: IState) => ({
      ...state,
      ...IOBuildings.setUtilization(
        state.settings.gameMode,
        state.buildings,
        state.resources,
        name,
        utilization,
      ),
    });
  },
  setBuildingVariantUtilization: (
    name: string,
    variantUtilizations: number[],
  ) => {
    return (state: IState) => ({
      ...state,
      ...IOBuildings.setVariantUtilization(
        state.settings.gameMode,
        state.buildings,
        state.resources,
        name,
        variantUtilizations,
      ),
    });
  },
  sortBuildings: (key: keyof IBuilding) => {
    return (state: IState) => ({
      ...state,
      ...IOBuildings.sort(
        state.buildings,
        state.buildingsOrderBy,
        key,
        state.buildingsOrder,
      ),
    });
  },
  clearBuildingInputs: () => {
    return (state: IState) => ({
      ...state,
      ...IOBuildings.clearInputs(
        state.settings.gameMode,
        state.buildings,
        state.resources,
      ),
    });
  },
};
