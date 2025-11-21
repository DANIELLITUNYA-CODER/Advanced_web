/**
 * View base class - provides mount/unmount lifecycle
 */

export class View {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = null;
    this.isMounted = false;
  }

  /**
   * Mount the view (show it)
   */
  mount() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container #${this.containerId} not found`);
      return;
    }

    this.container.hidden = false;
    this.isMounted = true;
    this.onMount();
  }

  /**
   * Unmount the view (hide it)
   */
  unmount() {
    if (!this.container) return;
    
    this.container.hidden = true;
    this.isMounted = false;
    this.onUnmount();
  }

  /**
   * Lifecycle hook - called after mount
   * Override in subclasses
   */
  onMount() {
    // Override in subclasses
  }

  /**
   * Lifecycle hook - called before unmount
   * Override in subclasses
   */
  onUnmount() {
    // Override in subclasses
  }

  /**
   * Render content into container
   * @param {string} html - HTML content to render
   */
  render(html) {
    if (!this.container) return;
    this.container.innerHTML = html;
  }

  /**
   * Get container element
   * @returns {HTMLElement|null} Container element
   */
  getContainer() {
    return this.container;
  }
}
