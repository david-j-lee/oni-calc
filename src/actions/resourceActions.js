import {
  SORT_RESOURCES,
} from '../constants/actionConstants';

// resources
export const sortResources = id => dispatch => {
  dispatch({
    type: SORT_RESOURCES,
    payload: id,
  });
};