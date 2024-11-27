import IState from '../interfaces/IState';
import IThemeSaved from '../interfaces/IThemeSaved';
import indigo from '@mui/material/colors/indigo';
import red from '@mui/material/colors/red';

export const uiActions = {
  getTheme: () => {
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
          theme = JSON.parse(strTheme) as IThemeSaved;
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
  setTheme: (theme: IThemeSaved) => {
    return (state: IState) => {
      localStorage.setItem('theme', JSON.stringify(theme));
      return {
        ...state,
        theme,
      };
    };
  },
};
