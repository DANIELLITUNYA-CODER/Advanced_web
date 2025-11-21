/**
 * Route table - maps hash routes to view IDs
 */

export const routeTable = {
  '': 'view-home',
  '#': 'view-home',
  '#home': 'view-home',
  '#data': 'view-data',
  '#form': 'view-form'
};

/**
 * Get view ID for a given hash
 * @param {string} hash - URL hash
 * @returns {string} View ID or default view
 */
export function getViewIdForHash(hash) {
  const normalizedHash = hash || '';
  return routeTable[normalizedHash] || routeTable[''];
}
