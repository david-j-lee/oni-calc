import IState from '../interfaces/IState';
import IOCritters from '../services/IOCritters';

export const critterActions = {
  setCritterQuantity(name: string, quantity: number) {
    return (state: IState) => {
      return {
        ...state,
        ...IOCritters.setQuantity(
          state.critters,
          state.resources,
          name,
          quantity,
        ),
      };
    };
  },
  clearCritterInputs() {
    return (state: IState) => {
      return {
        ...state,
        ...IOCritters.clearInputs(state.critters, state.resources),
      };
    };
  },
};
