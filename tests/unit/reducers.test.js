/**
 * Unit tests for reducers
 */

import { describe, it, expect } from 'vitest';
import { formReducer } from '../../src/state/reducers/formReducer.js';
import { dataReducer } from '../../src/state/reducers/dataReducer.js';
import { FORM_UPDATE, FORM_RESET, DATA_LOAD, DATA_CLEAR } from '../../src/state/actions.js';

describe('Reducers', () => {
  describe('formReducer', () => {
    it('should return initial state', () => {
      const state = formReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual({
        name: '',
        email: '',
        topic: '',
        message: ''
      });
    });

    it('should handle FORM_UPDATE', () => {
      const initialState = {
        name: '',
        email: '',
        topic: '',
        message: ''
      };
      const action = {
        type: FORM_UPDATE,
        payload: { field: 'name', value: 'John Doe' }
      };
      const state = formReducer(initialState, action);
      expect(state.name).toBe('John Doe');
      expect(state.email).toBe('');
    });

    it('should handle multiple FORM_UPDATE actions', () => {
      let state = {
        name: '',
        email: '',
        topic: '',
        message: ''
      };
      
      state = formReducer(state, {
        type: FORM_UPDATE,
        payload: { field: 'name', value: 'John' }
      });
      
      state = formReducer(state, {
        type: FORM_UPDATE,
        payload: { field: 'email', value: 'john@example.com' }
      });
      
      expect(state.name).toBe('John');
      expect(state.email).toBe('john@example.com');
    });

    it('should handle FORM_RESET', () => {
      const state = {
        name: 'John Doe',
        email: 'john@example.com',
        topic: 'general',
        message: 'Test'
      };
      const newState = formReducer(state, { type: FORM_RESET });
      expect(newState).toEqual({
        name: '',
        email: '',
        topic: '',
        message: ''
      });
    });

    it('should not mutate original state', () => {
      const initialState = {
        name: 'John',
        email: '',
        topic: '',
        message: ''
      };
      const action = {
        type: FORM_UPDATE,
        payload: { field: 'email', value: 'john@example.com' }
      };
      const newState = formReducer(initialState, action);
      expect(initialState.email).toBe('');
      expect(newState.email).toBe('john@example.com');
    });
  });

  describe('dataReducer', () => {
    it('should return initial state', () => {
      const state = dataReducer(undefined, { type: '@@INIT' });
      expect(state).toEqual({
        items: [],
        loaded: false
      });
    });

    it('should handle DATA_LOAD', () => {
      const initialState = {
        items: [],
        loaded: false
      };
      const items = [
        { id: '1', title: 'Item 1' },
        { id: '2', title: 'Item 2' }
      ];
      const action = {
        type: DATA_LOAD,
        payload: { items }
      };
      const state = dataReducer(initialState, action);
      expect(state.items).toEqual(items);
      expect(state.loaded).toBe(true);
    });

    it('should handle DATA_CLEAR', () => {
      const state = {
        items: [{ id: '1', title: 'Item 1' }],
        loaded: true
      };
      const newState = dataReducer(state, { type: DATA_CLEAR });
      expect(newState).toEqual({
        items: [],
        loaded: false
      });
    });

    it('should not mutate original state', () => {
      const initialState = {
        items: [],
        loaded: false
      };
      const items = [{ id: '1', title: 'Item 1' }];
      const action = {
        type: DATA_LOAD,
        payload: { items }
      };
      const newState = dataReducer(initialState, action);
      expect(initialState.items).toHaveLength(0);
      expect(newState.items).toHaveLength(1);
    });

    it('should replace items on DATA_LOAD', () => {
      const state = {
        items: [{ id: '1', title: 'Old Item' }],
        loaded: true
      };
      const newItems = [
        { id: '2', title: 'New Item 1' },
        { id: '3', title: 'New Item 2' }
      ];
      const action = {
        type: DATA_LOAD,
        payload: { items: newItems }
      };
      const newState = dataReducer(state, action);
      expect(newState.items).toEqual(newItems);
      expect(newState.items).toHaveLength(2);
    });
  });
});
