/**
 * DataView - Data display view with dynamic loading
 */

import { View } from '../View.js';
import { fetchItems } from '../../services/api.js';
import { normalizeItems } from '../../models/transform.js';
import { dataLoad } from '../../state/actions.js';
import { getDataItems, isDataLoaded } from '../../state/selectors/dataSelectors.js';

export class DataView extends View {
  constructor(containerId, dependencies = {}) {
    super(containerId);
    this.store = dependencies.store;
    this.hasLoadedOnce = false;
  }

  async onMount() {
    // Load data on first mount
    if (!this.hasLoadedOnce && this.store) {
      this.hasLoadedOnce = true;
      await this.loadData();
    }

    // Subscribe to data changes
    if (this.store) {
      this.unsubscribe = this.store.subscribeWithSelector(
        getDataItems,
        (items) => this.renderItems(items)
      );

      // Initial render with current state
      const state = this.store.getState();
      const items = getDataItems(state);
      this.renderItems(items);
    } else {
      this.renderItems([]);
    }
  }

  onUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  async loadData() {
    try {
      const items = await fetchItems();
      const normalized = normalizeItems(items);
      this.store.dispatch(dataLoad(normalized));
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  }

  renderItems(items) {
    const itemsHtml = items.length > 0
      ? items.map(item => `
          <li class="card">
            <h3>${this.escapeHtml(item.title)}</h3>
            <p>${this.escapeHtml(item.description)}</p>
            <p class="muted">Category: ${this.escapeHtml(item.category)}</p>
          </li>
        `).join('')
      : '<li class="card"><p>No items to display</p></li>';

    this.render(`
      <div class="wrap">
        <h1>Data overview</h1>

        <section aria-labelledby="list-title">
          <h2 id="list-title">Dynamic data list</h2>
          <ul class="card-list">
            ${itemsHtml}
          </ul>
        </section>

        <section aria-labelledby="table-title" class="table-wrap">
          <h2 id="table-title">Accessible table</h2>
          <p class="muted">No color-only meaning: status uses text and icons.</p>
          <div class="table-scroll">
            <table>
              <caption class="visually-hidden">Sample dataset with status</caption>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Record 1</th>
                  <td>Alpha</td>
                  <td><span aria-hidden="true">✓</span> Active</td>
                </tr>
                <tr>
                  <th scope="row">Record 2</th>
                  <td>Beta</td>
                  <td><span aria-hidden="true">⏳</span> Pending</td>
                </tr>
                <tr>
                  <th scope="row">Record 3</th>
                  <td>Gamma</td>
                  <td><span aria-hidden="true">✗</span> Inactive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    `);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
