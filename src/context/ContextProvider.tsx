import IState from '../interfaces/IState';
import { useGovernor } from '../utils/reactGovernor';
import { Context } from './Context';
import { actionsContract } from './actions';
import { initialState } from './initialState';
import React from 'react';

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
