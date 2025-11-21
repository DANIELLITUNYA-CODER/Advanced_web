/**
 * Router - handles hash-based navigation
 */

import { getViewIdForHash } from './route-table.js';
import { getView } from '../ui/viewFactory.js';

export class Router {
  constructor(dependencies = {}) {
    this.dependencies = dependencies;
    this.currentView = null;
    this.handleHashChange = this.handleHashChange.bind(this);
  }

  /**
   * Initialize the router
   */
  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', this.handleHashChange);

    // Navigate to current hash
    this.navigate(window.location.hash);
  }

  /**
   * Handle hash change events
   */
  handleHashChange() {
    this.navigate(window.location.hash);
  }

  /**
   * Navigate to a hash
   * @param {string} hash - URL hash
   */
  navigate(hash) {
    const viewId = getViewIdForHash(hash);

    // Unmount current view
    if (this.currentView) {
      this.currentView.unmount();
    }

    // Get and mount new view
    const view = getView(viewId, this.dependencies);
    if (view) {
      view.mount();
      this.currentView = view;
    } else {
      console.error(`Failed to load view: ${viewId}`);
    }
  }

  /**
   * Clean up router
   */
  destroy() {
    window.removeEventListener('hashchange', this.handleHashChange);
    if (this.currentView) {
      this.currentView.unmount();
    }
  }
}
