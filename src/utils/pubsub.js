/**
 * PubSub utility for event subscriptions
 * Provides a simple publish/subscribe pattern for decoupled communication
 */

export class PubSub {
  constructor() {
    this.subscribers = {};
  }

  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {Function} callback - Callback function to invoke
   * @returns {Function} Unsubscribe function
   */
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    // Return unsubscribe function
    return () => {
      this.subscribers[event] = this.subscribers[event].filter(
        (cb) => cb !== callback
      );
    };
  }

  /**
   * Publish an event
   * @param {string} event - Event name
   * @param {*} data - Data to pass to subscribers
   */
  publish(event, data) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach((callback) => callback(data));
  }

  /**
   * Clear all subscribers for an event or all events
   * @param {string} [event] - Optional event name to clear
   */
  clear(event) {
    if (event) {
      delete this.subscribers[event];
    } else {
      this.subscribers = {};
    }
  }
}
