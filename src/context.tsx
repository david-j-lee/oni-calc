import React from 'react';
import { useGovernor } from '@techempower/react-governor';

import IState from './interfaces/IState';

import { buildingActions } from './actions/buildingActions';
import { calculatorActions } from './actions/calculatorActions';
import { dupeActions } from './actions/dupeActions';
import { foodActions } from './actions/foodActions';
import { geyserActions } from './actions/geyserActions';
import { resourceActions } from './actions/resourceActions';
import { uiActions } from './actions/uiActions';

const INITIAL_STATE: IState = {
  tabIndex: 0,
  collapseBuildingPanels: false,
  collapseBuildingPanelsTrigger: false,
  buildings: [],
  buildingsLayout: 'grid',
  buildingsOrderBy: '',
  buildingOrder: 'desc',
  resources: [],
  resourcesOrderBy: 'name',
  resourcesOrder: 'asc',
  theme: null,
  powerUsage: {},
  powerGeneration: {},
  powerCapacity: {},
  resourcesCapacity: {},
  dupes: {},
  food: [],
  plants: [],
  geysers: {
    listing: [],
    inputted: [],
  },
};

const contract = {
  ...buildingActions,
  ...calculatorActions,
  ...dupeActions,
  ...foodActions,
  ...geyserActions,
  ...resourceActions,
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
