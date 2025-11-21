/**
 * View Factory - registry and factory for view instances
 */

import { HomeView } from './views/HomeView.js';
import { DataView } from './views/DataView.js';
import { FormView } from './views/FormView.js';

// View registry - maps view IDs to view classes
const viewRegistry = {
  'view-home': HomeView,
  'view-data': DataView,
  'view-form': FormView
};

// View instances cache
const viewInstances = new Map();

/**
 * Get or create a view instance
 * @param {string} viewId - View container ID
 * @param {Object} dependencies - Dependencies to inject (store, etc.)
 * @returns {View|null} View instance or null if not found
 */
export function getView(viewId, dependencies = {}) {
  // Check if view is registered
  const ViewClass = viewRegistry[viewId];
  if (!ViewClass) {
    console.error(`View not registered: ${viewId}`);
    return null;
  }

  // Return cached instance or create new one
  if (!viewInstances.has(viewId)) {
    viewInstances.set(viewId, new ViewClass(viewId, dependencies));
  }

  return viewInstances.get(viewId);
}

/**
 * Register a view class
 * @param {string} viewId - View container ID
 * @param {Class} ViewClass - View class
 */
export function registerView(viewId, ViewClass) {
  viewRegistry[viewId] = ViewClass;
}

/**
 * Clear view instance cache
 * @param {string} [viewId] - Optional specific view to clear
 */
export function clearViewCache(viewId) {
  if (viewId) {
    viewInstances.delete(viewId);
  } else {
    viewInstances.clear();
  }
}
