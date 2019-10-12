import {
  clearDupeInputs,
  setDupesQuantity,
  setDupeTraitQuantity,
  setDupeWaste,
} from '../utils/dupeUtils';

export const dupeActions = {
  setDupesTotalQuantity(quantity: number) {
    return state => {
      return {
        ...state,
        ...setDupesQuantity(
          state.settings.gameMode,
          state.resources,
          state.dupes,
          quantity,
        ),
      };
    };
  },
  setDupesTraitQuantity(name: string, quantity: number) {
    return state => {
      return {
        ...state,
        ...setDupeTraitQuantity(
          state.settings.gameMode,
          state.resources,
          state.dupes,
          name,
          quantity,
        ),
      };
    };
  },
  setDupeWaste(prop: string, value: number) {
    return state => {
      return {
        ...state,
        ...setDupeWaste(state.resources, state.dupes, prop, value),
      };
    };
  },
  clearDupeInputs() {
    return state => {
      return {
        ...state,
        ...clearDupeInputs(state.resources, state.dupes),
      };
    };
  },
};
