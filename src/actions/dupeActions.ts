import IState from '../interfaces/IState';
import {
  clearDupeInputs,
  dupesWastePropNames,
  setDupesQuantity,
  setDupeTraitQuantity,
  setDupeWaste,
} from '../utils/dupeUtils';

export const dupeActions = {
  setDupesTotalQuantity: (quantity: number) => {
    return (state: IState) => ({
      ...state,
      ...setDupesQuantity(
        state.settings.gameMode,
        state.resources,
        state.dupes,
        quantity,
      ),
    });
  },
  setDupesTraitQuantity: (name: string, quantity: number) => {
    return (state: IState) => ({
      ...state,
      ...setDupeTraitQuantity(
        state.settings.gameMode,
        state.resources,
        state.dupes,
        name,
        quantity,
      ),
    });
  },
  setDupeWaste: (prop: dupesWastePropNames, value: number) => {
    return (state: IState) => ({
      ...state,
      ...setDupeWaste(
        state.settings.gameMode,
        state.resources,
        state.dupes,
        prop,
        value,
      ),
    });
  },
  clearDupeInputs: () => {
    return (state: IState) => ({
      ...state,
      ...clearDupeInputs(state.settings.gameMode, state.resources, state.dupes),
    });
  },
};
