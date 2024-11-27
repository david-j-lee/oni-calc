import IState from '../interfaces/IState';
import { Context } from './Context';
import { actionsContract } from './actions';
import React from 'react';

export function useContext(): [IState, typeof actionsContract] {
  return React.useContext(Context);
}
