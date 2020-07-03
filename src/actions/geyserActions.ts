import {
  addGeyser,
  clearGeyserInputs,
  deleteGeyser,
} from '../utils/geyserUtils';

export const geyserActions = {
  // TODO: Types
  addGeyser(geyser: any) {
    return state => {
      return {
        ...state,
        ...addGeyser(state.resources, state.geysers, geyser),
      };
    };
  },
  // TODO: Types
  deleteGeyser(geyser: any) {
    return state => {
      return {
        ...state,
        ...deleteGeyser(state.resources, state.geysers, geyser),
      };
    };
  },
  clearGeyserInputs() {
    return state => {
      return {
        ...state,
        ...clearGeyserInputs(state.resources, state.geysers),
      };
    };
  },
};
