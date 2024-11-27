import IGeyserInput from '../interfaces/IGeyserInput';
import IState from '../interfaces/IState';
import {
  addGeyser,
  clearGeyserInputs,
  deleteGeyser,
} from '../utils/geyserUtils';

export const geyserActions = {
  addGeyser: (geyser: IGeyserInput) => {
    return (state: IState) => ({
      ...state,
      ...addGeyser(state.resources, state.geysers, geyser),
    });
  },
  deleteGeyser: (geyser: IGeyserInput) => {
    return (state: IState) => ({
      ...state,
      ...deleteGeyser(state.resources, state.geysers, geyser),
    });
  },
  clearGeyserInputs: () => {
    return (state: IState) => ({
      ...state,
      ...clearGeyserInputs(state.resources, state.geysers),
    });
  },
};
