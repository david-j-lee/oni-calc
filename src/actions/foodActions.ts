import IState from '../interfaces/IState';
import { clearFoodInputs, setFoodQuantity } from '../utils/foodUtils';

export const foodActions = {
  setFoodQuantity(name: string, quantity: number) {
    return (state: IState) => {
      return {
        ...state,
        ...setFoodQuantity(
          state.resources,
          state.plants,
          state.food,
          name,
          quantity,
        ),
      };
    };
  },
  clearFoodInputs() {
    return (state: IState) => {
      return {
        ...state,
        ...clearFoodInputs(state.resources, state.plants, state.food),
      };
    };
  },
};
