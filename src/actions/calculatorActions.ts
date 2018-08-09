import { GET_DATA } from '../constants/actionConstants';

// json data
import * as buildings from '../assets/json/buildings.json';
import * as dupes from '../assets/json/dupe.json';
import * as food from '../assets/json/food.json';
import * as geysers from '../assets/json/geysers.json';
import * as plants from '../assets/json/plants.json';
import * as resources from '../assets/json/resources.json';

// utils
import { parseBuildingInputs, parseBuildings } from '../utils/parseUtils';

export const getData = () => (dispatch: any) => {
  let dupeInputs: any = localStorage.getItem('dupes');
  let foodInputs: any = localStorage.getItem('food');
  let geyserInputs: any = localStorage.getItem('geysers');
  let layout: any = localStorage.getItem('layout');

  // remove old settings
  localStorage.removeItem('quantities');
  localStorage.removeItem('inputs');

  try {
    dupeInputs = JSON.parse(dupeInputs);
  } catch (e) {
    localStorage.removeItem('dupes');
    throw e;
  }

  try {
    foodInputs = JSON.parse(foodInputs);
  } catch (e) {
    localStorage.removeItem('food');
    throw e;
  }

  try {
    geyserInputs = JSON.parse(geyserInputs);
  } catch (e) {
    localStorage.removeItem('geysers');
    throw e;
  }

  if (layout === null) {
    layout = 'grid';
  }

  dispatch({
    type: GET_DATA,
    payload: {
      layout,
      resources,
      plants,
      buildings: parseBuildings(buildings),
      buildingInputs: parseBuildingInputs(localStorage.getItem('buildings')),
      dupes,
      dupeInputs,
      food,
      foodInputs,
      geysers,
      geyserInputs,
    },
  });
};
