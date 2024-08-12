/* eslint-disable @typescript-eslint/no-explicit-any */

// Copied from https://github.com/TechEmpower/react-governor with minor edits.

import { Dispatch, useReducer, useState } from 'react';

class Governor {
  __state: any;
  dispatch: Dispatch<any>;
  actions: any;
  middlewares: any[];

  constructor(
    contract: { [x: string]: any },
    dispatch: Dispatch<any>,
    initialState: any,
    middlewares = [],
  ) {
    this.dispatch = dispatch;
    this.actions = {};
    this.middlewares = Array.isArray(middlewares) ? middlewares : [middlewares];

    this.middlewares = this.middlewares.map(
      (mw: (arg0: any, arg1: any) => any) => mw(initialState, dispatch),
    );

    for (const actionKey in contract) {
      if (typeof contract[actionKey] !== 'function') {
        throw new TypeError(
          `action is invalid: expected "function"; for "${typeof contract[
            actionKey
          ]}"`,
        );
      }

      this.createAction(contract[actionKey], actionKey);
    }
  }

  /**
   * Takes an actionKey from the underlying contract and creates a corresponding
   * action.
   *
   * Example:
   * const contract = {
   *   foo(bar) {
   *     return state => ({
   *       ...state,
   *       bar
   *     });
   *   }
   * };
   *
   * This contract will be turned into an action that is analogous to:
   * {
   *   foo(bar, dispatch) {
   *     dispatch({ "newState": { ...this.state, bar } });
   *   }
   * }
   *
   * Async functions are similar, but do not dispatch until their underlying
   * promise has been fulfilled.
   *
   * Example:
   * const contract = {
   *   async foo(bar) {
   *     return state => ({
   *       ...state,
   *       bar
   *     });
   *   }
   * };
   *
   * This contract will be turned into an action that is analogous to:
   * {
   *   foo(bar, dispatch) {
   *     new Promise(resolve => ({ ...this.state, bar })).then(newState => {
   *       dispatch({ newState });
   *     });
   *   }
   * }
   *
   * @param {function} createReducer
   * @param {string} actionKey
   */
  createAction(createReducer: any, actionKey: string) {
    this.actions[actionKey] = (...args: any) => {
      const reducerOrPromise = createReducer(...args, this.getState);

      // If we have a Promise we do not want to dispatch until it resolves.
      if (reducerOrPromise && reducerOrPromise.then) {
        reducerOrPromise.then((reducer: any) => {
          this.dispatchFromActionReducer(reducer, actionKey);
        });
      } else {
        this.dispatchFromActionReducer(reducerOrPromise, actionKey);
      }
    };
  }

  dispatchFromActionReducer(reducer: (arg0: any) => any, actionKey: any) {
    let newState, error;
    if (typeof reducer !== 'function') {
      error = new TypeError(
        `action "${actionKey}" must return a reducer function; instead got "${typeof reducer}"`,
      );
      this.dispatch({ error });
      return;
    }

    newState = reducer(this.state);

    // middleware
    for (const middleware of this.middlewares) {
      newState = middleware(actionKey, newState);
    }

    this.__state = newState;

    this.dispatch({ newState: this.state });
  }

  /**
   * In order to ensure all calls to `state` in actions are not stale, it
   * needs to be a callback, but it will only ever be read so we just use a
   * getter.
   */
  get state() {
    return this.__state;
  }

  getState = () => {
    return this.__state;
  };
}

// We do not inline this reducer because it would cause 2 renders on first use.
function reducer(_state: any, action: { error: any; newState: any }) {
  if (action.error) {
    throw action.error;
  }
  return action.newState;
}

/**
 * Governs state by creating actions given by a contract.
 *
 * @param initialState The initial state of the governor
 * @param contract The contract from which actions are created
 * @param middlewares A single middleware function or array of middleware functions
 * @returns [state, actions] - the current state of the governor and the
 *          actions that can be invoked.
 */
function useGovernor<StateType, ContractType>(
  initialState: any,
  contract: any,
  middlewares?: any,
): [StateType, ContractType] {
  if (
    !contract ||
    (typeof contract !== 'object' && typeof contract !== 'function')
  ) {
    throw new TypeError(
      `contract is invalid: expected "object"; got "${typeof contract}"`,
    );
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [governor] = useState(
    new Governor(contract, dispatch, initialState, middlewares),
  );

  governor.__state = state;

  return [governor.__state, governor.actions];
}

export { useGovernor };
