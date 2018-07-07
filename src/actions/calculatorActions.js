import {
  GET_DATA,
  SET_BUILDING_QUANTITY,
  SORT_RESOURCE_USAGE,
  GET_THEME,
  SET_THEME,
  CLEAR_BUILDING_QUANTITIES,
  SORT_BUILDINGS,
  SET_BUILDINGS_LAYOUT,
  SET_BUILDING_UTILIZATION,
} from "../constants/actionConstants";

// json data
import buildings from '../assets/json/buildings.json';
import resources from '../assets/json/resources.json';

// material
import indigo from "@material-ui/core/colors/indigo";
import red from "@material-ui/core/colors/red";

// resources
export const sortResourceUsage = id => dispatch => {
  dispatch({
    type: SORT_RESOURCE_USAGE,
    payload: id,
  });
}

// buildings
export const getData = () => dispatch => {
  let inputs = localStorage.getItem("inputs");
  let layout = localStorage.getItem("layout");

  // remove old settings
  localStorage.removeItem("quantities");

  try {
    inputs = JSON.parse(inputs);
  } catch (e) {
    localStorage.removeItem("inputs");
    throw e;
  }
  if (layout === null) {
    layout = 'grid';
  }
  dispatch({
    type: GET_DATA,
    payload: { buildings, resources, inputs, layout }
  });
}

export const setBuildingsLayout = () => dispatch => {
  dispatch({
    type: SET_BUILDINGS_LAYOUT,
  });
}

export const setBuildingQuantity = (building, quantity) => dispatch => {
  dispatch({
    type: SET_BUILDING_QUANTITY,
    payload: { ...building, quantity },
  });
}

export const setBuildingUtilization = (name, utilization) => dispatch => {
  dispatch({
    type: SET_BUILDING_UTILIZATION,
    payload: { name, utilization },
  })
}

export const sortBuildings = id => dispatch => {
  dispatch({
    type: SORT_BUILDINGS,
    payload: id,
  });
}

export const clearBuildingQuantities = () => dispatch => {
  dispatch({
    type: CLEAR_BUILDING_QUANTITIES,
  });
}

// theme
export const getTheme = () => dispatch => {
  let theme = localStorage.getItem("theme");
  try {
    theme = JSON.parse(theme);
    if (!theme.palette.type) {
      throw new Error("using old settings");
    }
  } catch (e) {
    theme = {
      palette: {
        type: "dark",
        primary: indigo,
        secondary: red,
        error: red,
        contrastThreshold: 3
      }
    };
    localStorage.setItem("theme", JSON.stringify(theme));
  }
  if (!theme || theme.palette === undefined) {
  }
  dispatch({
    type: GET_THEME,
    payload: theme
  });
};

export const setTheme = theme => dispatch => {
  localStorage.setItem("theme", JSON.stringify(theme));
  dispatch({
    type: SET_THEME,
    payload: theme
  });
};
