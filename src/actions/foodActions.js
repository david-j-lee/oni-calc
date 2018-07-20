import { SET_FOOD_QUANTITY } from '../constants/actionConstants';

export const setFoodQuantity = (name, quantity) => dispatch => {
  dispatch({
    type: SET_FOOD_QUANTITY,
    payload: { name, quantity },
  });
};
