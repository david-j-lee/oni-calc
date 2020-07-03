// material
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';

export const uiActions = {
  getTheme() {
    return state => {
      let theme: any = {
        palette: {
          type: 'dark',
          primary: indigo,
          secondary: red,
          error: red,
          contrastThreshold: 3,
        },
      };
      const strTheme = localStorage.getItem('theme');
      if (strTheme) {
        try {
          theme = JSON.parse(strTheme);
          if (!theme && !theme.palette && !theme.palette.type) {
            throw new Error('using old settings');
          }
        } catch (e) {
          localStorage.setItem('theme', JSON.stringify(theme));
        }
      }
      return {
        ...state,
        theme,
      };
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
