/**
 * Data selectors - extract data state
 */

/**
 * Get entire data state
 * @param {Object} state - Root state
 * @returns {Object} Data state
 */
export function getDataState(state) {
  return state.data;
}

/**
 * Get data items
 * @param {Object} state - Root state
 * @returns {Array} Data items
 */
export function getDataItems(state) {
  return state.data.items;
}

/**
 * Check if data is loaded
 * @param {Object} state - Root state
 * @returns {boolean} Loaded status
 */
export function isDataLoaded(state) {
  return state.data.loaded;
}
