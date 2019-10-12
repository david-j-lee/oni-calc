export const settingsActions = {
  setGameMode(gameMode: any) {
    return state => {
      localStorage.setItem('settings', JSON.stringify({ gameMode }));
      return {
        ...state,
        settings: {
          ...state.settings,
          gameMode,
        },
      };
    };
  },
};
