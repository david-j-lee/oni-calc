import IGeyserInput from '../interfaces/IGeyserInput';
import IState from '../interfaces/IState';
import {
  addGeyser,
  clearGeyserInputs,
  deleteGeyser,
} from '../utils/geyserUtils';

export const geyserActions = {
  addGeyser(geyser: IGeyserInput) {
    return (state: IState) => {
      return {
        ...state,
        ...addGeyser(state.resources, state.geysers, geyser),
      };
    };
  },
  deleteGeyser(geyser: IGeyserInput) {
    return (state: IState) => {
      return {
        ...state,
        ...deleteGeyser(state.resources, state.geysers, geyser),
      };
    };
  },
  clearGeyserInputs() {
    return (state: IState) => {
      return {
        ...state,
        ...clearGeyserInputs(state.resources, state.geysers),
      };
    };
  },
};
