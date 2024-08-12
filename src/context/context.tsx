import { buildingActions } from '../actions/buildingActions';
import { calculatorActions } from '../actions/calculatorActions';
import { dupeActions } from '../actions/dupeActions';
import { foodActions } from '../actions/foodActions';
import { geyserActions } from '../actions/geyserActions';
import { plantActions } from '../actions/plantActions';
import { resourceActions } from '../actions/resourceActions';
import { settingsActions } from '../actions/settingsActions';
import { uiActions } from '../actions/uiActions';
import IState from '../interfaces/IState';
import { Context } from './ContextProvider';
import React from 'react';

export const initialState: IState = {
  tabIndex: 0,
  settings: { gameMode: 'survival', hideEmpty: false },
  collapseBuildingPanels: false,
  collapseBuildingPanelsTrigger: -1,
  buildings: [],
  buildingsLayout: 'grid',
  buildingsOrderBy: '',
  buildingsOrder: 'desc',
  resources: [],
  resourcesOrderBy: 'name',
  resourcesOrder: 'asc',
  theme: null,
  powerUsage: { buildings: [], value: 0 },
  powerGeneration: { buildings: [], value: 0 },
  powerCapacity: { buildings: [], value: 0 },
  resourcesCapacity: { buildings: [], value: 0 },
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
  food: [],
  plants: [],
  plantsOrder: 'desc',
  plantsOrderBy: 'name',
  geysers: { listing: [], inputted: [] },
};

export const actionsContract = {
  ...buildingActions,
  ...calculatorActions,
  ...dupeActions,
  ...foodActions,
  ...geyserActions,
  ...resourceActions,
  ...plantActions,
  ...settingsActions,
  ...uiActions,
};

export function useContext(): [IState, typeof actionsContract] {
  return React.useContext(Context);
}
