import IState from '../interfaces/IState';
import { Context } from './ContextProvider';
import { actionsContract } from './actions';
import React from 'react';

export function useContext(): [IState, typeof actionsContract] {
  return React.useContext(Context);
}
