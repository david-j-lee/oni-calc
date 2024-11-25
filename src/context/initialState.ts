import IState from '../interfaces/IState';

export const initialState: IState = {
  tabIndex: 0,
  settings: { gameMode: 'survival', hideEmpty: false },
  collapseBuildingPanels: false,
  collapseBuildingPanelsTrigger: -1,
  theme: null,

  resources: [],
  resourcesOrderBy: 'name',
  resourcesOrder: 'asc',
  resourcesCapacity: { buildings: [], value: 0 },

  powerUsage: { buildings: [], value: 0 },
  powerGeneration: { buildings: [], value: 0 },
  powerCapacity: { buildings: [], value: 0 },

  dupes: {
    inputs: [],
    outputs: [],
    traits: [],
    quantity: 0,
    caloriesRequired: 0,
    waterValue: 0,
    pollutedWaterValue: 0,
    dirtValue: 0,
    pollutedDirtValue: 0,
  },

  buildings: [],
  buildingsLayout: 'grid',
  buildingsOrderBy: '',
  buildingsOrder: 'desc',

  critters: [],
  plants: [],

  geysers: { listing: [], inputted: [] },
};
