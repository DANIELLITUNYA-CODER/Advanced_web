/**
 * Unit tests for selectors
 */

import { describe, it, expect } from 'vitest';
import { getFormState, getFormField, getFormValues } from '../../src/state/selectors/formSelectors.js';
import { getDataState, getDataItems, isDataLoaded } from '../../src/state/selectors/dataSelectors.js';

describe('Selectors', () => {
  describe('formSelectors', () => {
    const mockState = {
      form: {
        name: 'John Doe',
        email: 'john@example.com',
        topic: 'general',
        message: 'Test message'
      },
      data: {
        items: [],
        loaded: false
      }
    };

    it('should get entire form state', () => {
      const formState = getFormState(mockState);
      expect(formState).toEqual(mockState.form);
    });

    it('should get specific form field', () => {
      expect(getFormField(mockState, 'name')).toBe('John Doe');
      expect(getFormField(mockState, 'email')).toBe('john@example.com');
      expect(getFormField(mockState, 'topic')).toBe('general');
    });

    it('should get form values as new object', () => {
      const values = getFormValues(mockState);
      expect(values).toEqual(mockState.form);
      expect(values).not.toBe(mockState.form); // Should be a copy
    });
  });

  describe('dataSelectors', () => {
    const mockState = {
      form: {
        name: '',
        email: '',
        topic: '',
        message: ''
      },
      data: {
        items: [
          { id: '1', title: 'Item 1' },
          { id: '2', title: 'Item 2' }
        ],
        loaded: true
      }
    };

    it('should get entire data state', () => {
      const dataState = getDataState(mockState);
      expect(dataState).toEqual(mockState.data);
    });

    it('should get data items', () => {
      const items = getDataItems(mockState);
      expect(items).toEqual(mockState.data.items);
      expect(items).toHaveLength(2);
    });

    it('should check if data is loaded', () => {
      expect(isDataLoaded(mockState)).toBe(true);
    });

    it('should return false when data is not loaded', () => {
      const unloadedState = {
        ...mockState,
        data: {
          items: [],
          loaded: false
        }
      };
      expect(isDataLoaded(unloadedState)).toBe(false);
    });
  });
});
