/**
 * Data reducer - manages data state
 */

import { DATA_LOAD, DATA_CLEAR } from '../actions.js';

const initialState = {
  items: [],
  loaded: false
};

/**
 * Data reducer function
 * @param {Object} state - Current state
 * @param {Object} action - Action object
 * @returns {Object} New state
 */
export function dataReducer(state = initialState, action) {
  switch (action.type) {
    case DATA_LOAD:
      return {
        ...state,
        items: action.payload.items,
        loaded: true
      };
    case DATA_CLEAR:
      return { ...initialState };
    default:
      return state;
  }
}
