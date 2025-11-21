/**
 * Form reducer - manages form state
 */

import { FORM_UPDATE, FORM_RESET } from '../actions.js';

const initialState = {
  name: '',
  email: '',
  topic: '',
  message: ''
};

/**
 * Form reducer function
 * @param {Object} state - Current state
 * @param {Object} action - Action object
 * @returns {Object} New state
 */
export function formReducer(state = initialState, action) {
  switch (action.type) {
    case FORM_UPDATE:
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    case FORM_RESET:
      return { ...initialState };
    default:
      return state;
  }
}
