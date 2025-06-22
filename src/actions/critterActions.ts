import IState from '../interfaces/IState';
import IOCritters from '../services/IOCritters';

export const critterActions = {
  setCritterQuantity: (name: string, quantity: number) => {
    return (state: IState) => ({
      ...state,
      ...IOCritters.setQuantity(
        state.settings.gameMode,
        state.critters,
        state.resources,
        name,
        quantity,
      ),
    });
  },
  setCritterUtilization: (name: string, utilization: number) => {
    return (state: IState) => ({
      ...state,
      ...IOCritters.setUtilization(
        state.settings.gameMode,
        state.critters,
        state.resources,
        name,
        utilization,
      ),
    });
  },
  setCritterVariantUtilization: (
    name: string,
    variantUtilizations: number[],
  ) => {
    return (state: IState) => ({
      ...state,
      ...IOCritters.setVariantUtilization(
        state.settings.gameMode,
        state.critters,
        state.resources,
        name,
        variantUtilizations,
      ),
    });
  },
  clearCritterInputs: () => {
    return (state: IState) => ({
      ...state,
      ...IOCritters.clearInputs(state.settings.gameMode, state.critters, state.resources),
    });
  },
};
