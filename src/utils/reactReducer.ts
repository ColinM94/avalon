import * as React from "react";

/**
 * Abstraction for React.useReducer so it's easier to use and setup.
 * @param initialState - Initial State of reducer
 * @returns React useReducer ready to be used.
 */
export const reactReducer = <T>(initialState: T) => {
  return React.useReducer((state: T, updates: Partial<T>) => {
    return { ...state, ...updates };
  }, initialState);
};
