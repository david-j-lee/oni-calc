import IState from '../interfaces/IState';
import IOPlants from '../services/IOPlants';

export const plantActions = {
  setPlantQuantity(name: string, quantity: number) {
    return (state: IState) => {
      return {
        ...state,
        ...IOPlants.setQuantity(
          state.critters,
          state.resources,
          name,
          quantity,
        ),
      };
    };
  },
  clearPlantInputs() {
    return (state: IState) => {
      return {
        ...state,
        ...IOPlants.clearInputs(state.critters, state.resources),
      };
    };
  },
};
