import { sortPlants } from '../utils/plantUtils';

export const plantActions = {
  sortPlants(key: string) {
    return (state) => {
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
