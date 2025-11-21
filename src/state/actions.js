/**
 * Action constants and action creators
 */

// Action types
export const FORM_UPDATE = 'FORM_UPDATE';
export const FORM_RESET = 'FORM_RESET';
export const DATA_LOAD = 'DATA_LOAD';
export const DATA_CLEAR = 'DATA_CLEAR';

/**
 * Update form field value
 * @param {string} field - Field name
 * @param {*} value - Field value
 * @returns {Object} Action object
 */
export function formUpdate(field, value) {
  return {
    type: FORM_UPDATE,
    payload: { field, value }
  };
}

/**
 * Reset form to initial state
 * @returns {Object} Action object
 */
export function formReset() {
  return {
    type: FORM_RESET
  };
}

/**
 * Load data items
 * @param {Array} items - Data items
 * @returns {Object} Action object
 */
export function dataLoad(items) {
  return {
    type: DATA_LOAD,
    payload: { items }
  };
}

/**
 * Clear data
 * @returns {Object} Action object
 */
export function dataClear() {
  return {
    type: DATA_CLEAR
  };
}
