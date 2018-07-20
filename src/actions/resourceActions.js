import {
  SORT_RESOURCE_USAGE,
} from '../constants/actionConstants';

// resources
export const sortResourceUsage = id => dispatch => {
  dispatch({
    type: SORT_RESOURCE_USAGE,
    payload: id,
  });
};