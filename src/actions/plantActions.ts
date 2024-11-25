import IState from '../interfaces/IState';
import IOPlants from '../services/IOPlants';

export const plantActions = {
  setPlantQuantity(name: string, quantity: number) {
    return (state: IState) => ({
      ...state,
      ...IOPlants.setQuantity(state.plants, state.resources, name, quantity),
    });
  },
  setPlantUtilization(name: string, utilization: number) {
    return (state: IState) => ({
      ...state,
      ...IOPlants.setUtilization(
        state.plants,
        state.resources,
        name,
        utilization,
      ),
    });
  },
  setPlantVariantUtilization(name: string, variantUtilizations: number[]) {
    return (state: IState) => ({
      ...state,
      ...IOPlants.setVariantUtilization(
        state.plants,
        state.resources,
        name,
        variantUtilizations,
      ),
    });
  },
  clearPlantInputs() {
    return (state: IState) => ({
      ...state,
      ...IOPlants.clearInputs(state.plants, state.resources),
    });
  },
};
