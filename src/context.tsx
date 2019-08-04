import React from 'react';
import { useGovernor } from '@techempower/react-governor';

import IState from './interfaces/IState';
// import { tableActions, getTheme, getElements } from './actions/tableActions';

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
  theme: {},
  powerUsage: {},
  powerGeneration: {},
  powerCapacity: {},
  resourcesCapacity: {},
  dupes: {},
  food: [],
  geysers: {},
};

const contract = {
  // ...tableActions,
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
