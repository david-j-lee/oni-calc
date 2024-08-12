import { actionsContract, initialState } from '../context/context';
import IState from '../interfaces/IState';
import { useGovernor } from '../utils/reactGovernor';
import React from 'react';

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
