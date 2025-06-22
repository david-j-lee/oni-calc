import { IGameMode } from '../interfaces/IGameMode';
import IState from '../interfaces/IState';
import { getCaloriesRequired } from '../utils/dupeUtils';
import { updateResourcesWithDupes } from '../utils/resourceUtils';

export const settingsActions = {
  toggleHideEmpty: () => {
    return (state: IState) => {
      const settings = {
        ...state.settings,
        hideEmpty: !state.settings.hideEmpty,
      };
      localStorage.setItem('settings', JSON.stringify(settings)); //TODO dry
      return { ...state, settings };
    };
  },
  setGameMode: (gameMode: IGameMode) => {
    return (state: IState) => {
      const settings = {
        ...state.settings,
        gameMode,
      };
      const newDupes = {
        ...state.dupes,
        caloriesRequired: getCaloriesRequired(gameMode, state.dupes),
      };
      localStorage.setItem('settings', JSON.stringify(settings));
      return {
        ...state,
        settings,
        resources: updateResourcesWithDupes(
          gameMode,
          state.resources,
          newDupes,
        ),
        dupes: newDupes,
      };
    };
  },
};
