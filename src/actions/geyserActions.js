import { ADD_GEYSER, DELETE_GEYSER } from '../constants/actionConstants';

export const addGeyser = geyser => dispatch => {
  dispatch({
    type: ADD_GEYSER,
    payload: geyser,
  });
};

export const deleteGeyser = geyser => dispatch => {
  dispatch({
    type: DELETE_GEYSER,
    payload: geyser,
  });
};
