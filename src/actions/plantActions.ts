import IState from '../interfaces/IState';
import { sortPlants } from '../utils/plantUtils';

export const plantActions = {
  sortPlants(key: string) {
    return (state: IState) => {
      return {
        ...state,
        ...sortPlants(
          state.plants,
          state.plantsOrderBy,
          key,
          state.plantsOrder,
        ),
      };
    };
  },
};
