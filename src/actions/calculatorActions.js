import { GET_DATA } from '../constants/actionConstants';

// json data
import resources from '../assets/json/resources.json';
import plants from '../assets/json/plants.json';
import dupes from '../assets/json/dupe.json';
import buildings from '../assets/json/buildings.json';
import food from '../assets/json/food.json';
import geysers from '../assets/json/geysers.json';

export const getData = () => dispatch => {
  let dupeInputs = localStorage.getItem('dupes');
  let buildingInputs = localStorage.getItem('buildings');
  let foodInputs = localStorage.getItem('food');
  let geyserInputs = localStorage.getItem('geysers');
  let layout = localStorage.getItem('layout');

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
    buildingInputs = JSON.parse(buildingInputs);
  } catch (e) {
    localStorage.removeItem('buildings');
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
      buildings,
      buildingInputs,
      dupes,
      dupeInputs,
      food,
      foodInputs,
      geysers,
      geyserInputs,
    },
  });
};
