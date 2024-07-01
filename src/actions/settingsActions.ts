import { getCaloriesRequired } from '../utils/dupeUtils';

export const settingsActions = {
  toggleHideEmpty() {
    return state => {
      const settings = {
        ...state.settings,
        hideEmpty: !state.settings.hideEmpty,
      }
      localStorage.setItem('settings', JSON.stringify(settings)); //TODO dry
      return { ...state, settings }
    }
  },
  setGameMode(gameMode: string) {
    return state => {
      const settings = {
        ...state.settings,
        gameMode,
      }
      localStorage.setItem('settings', JSON.stringify(settings));
      return {
        ...state,
        settings,
        dupes: {
          ...state.dupes,
          caloriesRequired: getCaloriesRequired(gameMode, state.dupes),
        },
      };
    };
  },
};
