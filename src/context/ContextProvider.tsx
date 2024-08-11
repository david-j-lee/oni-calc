import React from 'react';
import { useGovernor } from '../utils/reactGovernor';

import IState from '../interfaces/IState';
import { actionsContract, initialState } from '../context/context';

export const Context = React.createContext<[IState, typeof actionsContract]>([
  initialState,
  actionsContract,
]);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [context, actions] = useGovernor<IState, typeof actionsContract>(
    initialState,
    actionsContract,
  );

  return (
    <Context.Provider value={[context, actions]}>{children}</Context.Provider>
  );
}
