// material
import indigo from '@mui/material/colors/indigo';
import red from '@mui/material/colors/red';
import IState from '../interfaces/IState';
import IThemeSaved from '../interfaces/IThemeSaved';

export const uiActions = {
  getTheme() {
    return (state: IState) => {
      let theme: IThemeSaved = {
        palette: {
          mode: 'dark',
          primary: indigo,
          secondary: red,
          error: red,
          contrastThreshold: 3,
        },
      };
      const strTheme = localStorage.getItem('theme');
      if (strTheme) {
        try {
          const savedTheme = JSON.parse(strTheme);
          if (!savedTheme && !savedTheme.palette && !savedTheme.palette.type) {
            throw new Error('using old settings');
          }
          if (savedTheme.palette?.type) {
            savedTheme.palette.mode = savedTheme.palette.type;
          }
          theme = savedTheme;
        } catch {
          localStorage.setItem('theme', JSON.stringify(theme));
        }
      }
      return {
        ...state,
        theme,
      };
    };
  },
  setTheme(theme: IThemeSaved) {
    return (state: IState) => {
      localStorage.setItem('theme', JSON.stringify(theme));
      return {
        ...state,
        theme,
      };
    };
  },
};
