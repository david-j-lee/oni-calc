import {
  SET_TAB_INDEX,
  GET_THEME,
  SET_THEME,
} from '../constants/actionConstants';

// material
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';

export const setTabIndex = value => dispatch => {
  dispatch({
    type: SET_TAB_INDEX,
    payload: value,
  });
};

// theme
export const getTheme = () => dispatch => {
  let theme = localStorage.getItem('theme');
  try {
    theme = JSON.parse(theme);
    if (!theme.palette.type) {
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
  if (!theme || theme.palette === undefined) {
  }
  dispatch({
    type: GET_THEME,
    payload: theme,
  });
};

export const setTheme = theme => dispatch => {
  localStorage.setItem('theme', JSON.stringify(theme));
  dispatch({
    type: SET_THEME,
    payload: theme,
  });
};
