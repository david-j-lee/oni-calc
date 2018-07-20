import {
  SET_FOOD_QUANTITY,
  CLEAR_FOOD_INPUTS,
} from '../constants/actionConstants';

export const setFoodQuantity = (name, quantity) => dispatch => {
  dispatch({
    type: SET_FOOD_QUANTITY,
    payload: { name, quantity },
  });
};

export const clearFoodInputs = () => dispatch => {
  dispatch({
    type: CLEAR_FOOD_INPUTS,
  });
};
