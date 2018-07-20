import {
  SET_BUILDING_QUANTITY,
  CLEAR_BUILDING_INPUTS,
  SORT_BUILDINGS,
  SET_BUILDINGS_LAYOUT,
  SET_BUILDING_UTILIZATION,
} from '../constants/actionConstants';

export const setBuildingsLayout = () => dispatch => {
  dispatch({
    type: SET_BUILDINGS_LAYOUT,
  });
};

export const setBuildingQuantity = (name, quantity) => dispatch => {
  dispatch({
    type: SET_BUILDING_QUANTITY,
    payload: { name, quantity },
  });
};

export const setBuildingUtilization = (name, utilization) => dispatch => {
  dispatch({
    type: SET_BUILDING_UTILIZATION,
    payload: { name, utilization },
  });
};

export const sortBuildings = id => dispatch => {
  dispatch({
    type: SORT_BUILDINGS,
    payload: id,
  });
};

export const clearBuildingInputs = () => dispatch => {
  dispatch({
    type: CLEAR_BUILDING_INPUTS,
  });
};