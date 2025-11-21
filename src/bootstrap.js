/**
 * Bootstrap - Application initialization
 */

import { Store } from './state/store.js';
import { Router } from './router/index.js';

// Import existing a11y script functionality
// Note: a11y.js is loaded separately and runs in global scope

/**
 * Initialize the application
 */
function init() {
  // Create store instance
  const store = new Store();

  // Create router with dependencies
  const router = new Router({ store });

  // Initialize router
  router.init();

  // Make store available globally for debugging (optional)
  if (typeof window !== 'undefined') {
    window.__APP_STORE__ = store;
  }

  console.log('Application initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
