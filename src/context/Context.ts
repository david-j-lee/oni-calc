import IState from '../interfaces/IState';
import { actionsContract } from './actions';
import { initialState } from './initialState';
import React from 'react';

export const Context = React.createContext<[IState, typeof actionsContract]>([
  initialState,
  actionsContract,
]);
