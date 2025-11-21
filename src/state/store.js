/**
 * Store - Immutable state management with pub/sub
 */

import { PubSub } from '../utils/pubsub.js';
import { deepFreeze } from '../utils/deepFreeze.js';
import { formReducer } from './reducers/formReducer.js';
import { dataReducer } from './reducers/dataReducer.js';

export class Store {
  constructor(initialState = {}) {
    this.state = deepFreeze({
      form: formReducer(undefined, { type: '@@INIT' }),
      data: dataReducer(undefined, { type: '@@INIT' }),
      ...initialState
    });
    this.pubsub = new PubSub();
    this.selectorSubscriptions = new Map();
  }

  /**
   * Get current state (read-only)
   * @returns {Object} Current state
   */
  getState() {
    return this.state;
  }

  /**
   * Dispatch an action to update state
   * @param {Object} action - Action object with type and optional payload
   */
  dispatch(action) {
    const prevState = this.state;
    
    // Apply reducers
    const newState = {
      form: formReducer(prevState.form, action),
      data: dataReducer(prevState.data, action)
    };

    // Only update if state actually changed
    if (JSON.stringify(newState) !== JSON.stringify(prevState)) {
      this.state = deepFreeze(newState);
      this.pubsub.publish('state:change', this.state);
      
      // Notify selector subscribers
      this.notifySelectorSubscribers();
    }
  }

  /**
   * Subscribe to state changes
   * @param {Function} callback - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    return this.pubsub.subscribe('state:change', callback);
  }

  /**
   * Subscribe to state changes with selector
   * @param {Function} selector - Selector function
   * @param {Function} callback - Callback function
   * @returns {Function} Unsubscribe function
   */
  subscribeWithSelector(selector, callback) {
    let previousValue = selector(this.state);
    
    const unsubscribe = this.pubsub.subscribe('state:change', (state) => {
      const currentValue = selector(state);
      if (JSON.stringify(currentValue) !== JSON.stringify(previousValue)) {
        previousValue = currentValue;
        callback(currentValue);
      }
    });

    return unsubscribe;
  }

  /**
   * Notify selector subscribers
   * @private
   */
  notifySelectorSubscribers() {
    // Trigger selector-based subscriptions via state:change event
    // The subscribeWithSelector method handles the comparison
  }
}
