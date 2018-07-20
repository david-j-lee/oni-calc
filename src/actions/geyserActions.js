import {
  ADD_GEYSER,
  DELETE_GEYSER,
  CLEAR_GEYSER_INPUTS,
} from '../constants/actionConstants';

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

export const clearGeyserInputs = () => dispatch => {
  dispatch({
    type: CLEAR_GEYSER_INPUTS,
  });
};
