/**
 * FormView - Form with validation and live preview
 */

import { View } from '../View.js';
import { formUpdate, formReset } from '../../state/actions.js';
import { getFormState } from '../../state/selectors/formSelectors.js';
import { validateForm } from '../../models/validation.js';

export class FormView extends View {
  constructor(containerId, dependencies = {}) {
    super(containerId);
    this.store = dependencies.store;
    this.formErrors = {};
  }

  onMount() {
    this.renderForm();
    this.attachEventListeners();

    // Subscribe to form state changes
    if (this.store) {
      this.unsubscribe = this.store.subscribeWithSelector(
        getFormState,
        (formState) => this.updatePreview(formState)
      );

      // Initial preview
      const state = this.store.getState();
      this.updatePreview(getFormState(state));
    }
  }

  onUnmount() {
    this.detachEventListeners();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  renderForm() {
    const state = this.store ? this.store.getState() : null;
    const formData = state ? getFormState(state) : { name: '', email: '', topic: '', message: '' };

    this.render(`
      <div class="wrap">
        <h1>Contact us</h1>

        <form class="form" id="contact-form" novalidate>
          <fieldset>
            <legend>Your details</legend>

            <div class="form-group">
              <label for="name">Name <span class="required" aria-hidden="true">*</span></label>
              <div id="name-help" class="help">Enter your full name.</div>
              <input 
                id="name" 
                name="name" 
                type="text" 
                required 
                aria-describedby="name-help"
                aria-invalid="${this.formErrors.name ? 'true' : 'false'}"
                value="${this.escapeHtml(formData.name)}"
              />
              ${this.formErrors.name ? `<div class="error" role="alert">${this.formErrors.name}</div>` : ''}
            </div>

            <div class="form-group">
              <label for="email">Email <span class="required" aria-hidden="true">*</span></label>
              <div id="email-help" class="help">We'll only use it to reply.</div>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                aria-describedby="email-help"
                aria-invalid="${this.formErrors.email ? 'true' : 'false'}"
                value="${this.escapeHtml(formData.email)}"
              />
              ${this.formErrors.email ? `<div class="error" role="alert">${this.formErrors.email}</div>` : ''}
            </div>

            <div class="form-group">
              <label for="topic">Topic</label>
              <div class="help" id="topic-help">Choose the most relevant topic.</div>
              <select id="topic" name="topic" aria-describedby="topic-help">
                <option value="" ${!formData.topic ? 'selected' : ''}>Please select</option>
                <option value="general" ${formData.topic === 'general' ? 'selected' : ''}>General</option>
                <option value="support" ${formData.topic === 'support' ? 'selected' : ''}>Support</option>
                <option value="feedback" ${formData.topic === 'feedback' ? 'selected' : ''}>Feedback</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">Message <span class="required" aria-hidden="true">*</span></label>
              <div id="message-help" class="help">Be as descriptive as possible.</div>
              <textarea 
                id="message" 
                name="message" 
                rows="6" 
                required 
                aria-describedby="message-help"
                aria-invalid="${this.formErrors.message ? 'true' : 'false'}"
              >${this.escapeHtml(formData.message)}</textarea>
              ${this.formErrors.message ? `<div class="error" role="alert">${this.formErrors.message}</div>` : ''}
            </div>

            <div class="form-actions">
              <button class="button" type="submit">Send</button>
              <button class="button secondary" type="reset">Reset</button>
            </div>

            <p class="muted"><span class="required" aria-hidden="true">*</span> Required fields</p>
          </fieldset>
        </form>

        <aside aria-labelledby="preview-title" class="sidebar">
          <h2 id="preview-title">Form data preview</h2>
          <div 
            id="form-preview" 
            aria-live="polite" 
            aria-atomic="true"
            class="form-preview"
          >
            <pre><code>${this.escapeHtml(JSON.stringify(formData, null, 2))}</code></pre>
          </div>
        </aside>
      </div>
    `);
  }

  attachEventListeners() {
    const form = this.container.querySelector('#contact-form');
    if (!form) return;

    this.handleInput = (e) => {
      const field = e.target.name;
      const value = e.target.value;
      
      if (this.store && field) {
        this.store.dispatch(formUpdate(field, value));
        
        // Validate on input
        const state = this.store.getState();
        const formData = getFormState(state);
        this.formErrors = validateForm(formData);
        this.updateValidationUI();
      }
    };

    this.handleSubmit = (e) => {
      e.preventDefault();
      
      if (this.store) {
        const state = this.store.getState();
        const formData = getFormState(state);
        this.formErrors = validateForm(formData);
        
        if (Object.keys(this.formErrors).length === 0) {
          alert('Form is valid! Data: ' + JSON.stringify(formData, null, 2));
        } else {
          this.renderForm();
        }
      }
    };

    this.handleReset = (e) => {
      if (this.store) {
        this.store.dispatch(formReset());
        this.formErrors = {};
        this.renderForm();
      }
    };

    form.addEventListener('input', this.handleInput);
    form.addEventListener('submit', this.handleSubmit);
    form.addEventListener('reset', this.handleReset);
  }

  detachEventListeners() {
    const form = this.container.querySelector('#contact-form');
    if (!form) return;

    if (this.handleInput) form.removeEventListener('input', this.handleInput);
    if (this.handleSubmit) form.removeEventListener('submit', this.handleSubmit);
    if (this.handleReset) form.removeEventListener('reset', this.handleReset);
  }

  updatePreview(formState) {
    const preview = this.container.querySelector('#form-preview');
    if (preview) {
      preview.innerHTML = `<pre><code>${this.escapeHtml(JSON.stringify(formState, null, 2))}</code></pre>`;
    }
  }

  updateValidationUI() {
    // Update aria-invalid attributes
    Object.keys(this.formErrors).forEach(field => {
      const input = this.container.querySelector(`[name="${field}"]`);
      if (input) {
        input.setAttribute('aria-invalid', 'true');
      }
    });

    // Remove aria-invalid from valid fields
    const state = this.store.getState();
    const formData = getFormState(state);
    Object.keys(formData).forEach(field => {
      if (!this.formErrors[field]) {
        const input = this.container.querySelector(`[name="${field}"]`);
        if (input) {
          input.setAttribute('aria-invalid', 'false');
        }
      }
    });
  }

  escapeHtml(text) {
    if (typeof text !== 'string') {
      text = String(text);
    }
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
