import React from 'react';
import { useGovernor } from '@techempower/react-governor';

import IState from './interfaces/IState';

import { buildingActions } from './actions/buildingActions';
import { calculatorActions } from './actions/calculatorActions';
import { dupeActions } from './actions/dupeActions';
import { foodActions } from './actions/foodActions';
import { geyserActions } from './actions/geyserActions';
import { resourceActions } from './actions/resourceActions';
import { plantActions } from './actions/plantActions';
import { settingsActions } from './actions/settingsActions';
import { uiActions } from './actions/uiActions';

export const INITIAL_STATE: IState = {
  tabIndex: 0,
  settings: { gameMode: 'survival' },
  collapseBuildingPanels: false,
  collapseBuildingPanelsTrigger: -1,
  buildings: [],
  buildingsLayout: 'grid',
  buildingsOrderBy: '',
  buildingOrder: 'desc',
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

const contract = {
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

const Context = React.createContext(INITIAL_STATE);

export default function ContextProvider(props: any) {
  const [context, actions] = useGovernor(INITIAL_STATE, contract);

  const { children } = props;

  return (
    <Context.Provider value={[context, actions] as any}>
      {children}
    </Context.Provider>
  );
}

export function useContext(): [IState, any] {
  return React.useContext(Context) as any;
}
