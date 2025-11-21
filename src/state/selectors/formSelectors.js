/**
 * Form selectors - extract form state
 */

/**
 * Get entire form state
 * @param {Object} state - Root state
 * @returns {Object} Form state
 */
export function getFormState(state) {
  return state.form;
}

/**
 * Get form field value
 * @param {Object} state - Root state
 * @param {string} field - Field name
 * @returns {*} Field value
 */
export function getFormField(state, field) {
  return state.form[field];
}

/**
 * Get all form values as object
 * @param {Object} state - Root state
 * @returns {Object} Form values
 */
export function getFormValues(state) {
  return { ...state.form };
}
