import {
  SET_DUPES_TOTAL_QUANTITY,
  SET_DUPE_TRAIT_QUANTITY,
  SET_DUPE_WASTE,
} from '../constants/actionConstants';

export const setDupesTotalQuantity = quantity => dispatch => {
  dispatch({
    type: SET_DUPES_TOTAL_QUANTITY,
    payload: quantity,
  });
};

export const setDupeTraitQuantity = (name, quantity) => dispatch => {
  dispatch({
    type: SET_DUPE_TRAIT_QUANTITY,
    payload: { name, quantity },
  });
};

export const setDupeWaste = (prop, value) => dispatch => {
  dispatch({
    type: SET_DUPE_WASTE,
    payload: { prop, value },
  });
};