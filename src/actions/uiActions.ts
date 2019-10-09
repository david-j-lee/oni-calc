// import {
//   SET_TAB_INDEX,
//   GET_THEME,
//   SET_THEME,
// } from '../constants/actionConstants';

// material
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';

export const uiActions = {
  getTheme() {
    return state => {
      const strTheme = localStorage.getItem('theme');
      let theme: any;
      if (strTheme) {
        try {
          theme = JSON.parse(strTheme);
          if (!theme && !theme.palette && !theme.palette.type) {
            throw new Error('using old settings');
          }
        } catch (e) {
          theme = {
            palette: {
              type: 'dark',
              primary: indigo,
              secondary: red,
              error: red,
              contrastThreshold: 3,
            },
          };
          localStorage.setItem('theme', JSON.stringify(theme));
        }
        return {
          ...state,
          theme,
        };
      }
      return state;
    };
  },
  setTheme(theme: any) {
    return state => {
      localStorage.setItem('theme', JSON.stringify(theme));
      return {
        ...state,
        theme,
      };
    };
  },
};
