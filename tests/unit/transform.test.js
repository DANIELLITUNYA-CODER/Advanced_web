/**
 * Unit tests for transform functions
 */

import { describe, it, expect } from 'vitest';
import { normalizeItems, transformFormData, formatItemsForDisplay } from '../../src/models/transform.js';

describe('Transform', () => {
  describe('normalizeItems', () => {
    it('should normalize items with all fields', () => {
      const items = [
        { id: '1', title: 'Test', description: 'Desc', category: 'cat1' }
      ];
      const result = normalizeItems(items);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: '1',
        title: 'Test',
        description: 'Desc',
        category: 'cat1'
      });
    });

    it('should generate ID for items without ID', () => {
      const items = [
        { title: 'Test 1' },
        { title: 'Test 2' }
      ];
      const result = normalizeItems(items);
      expect(result[0].id).toBe('item-0');
      expect(result[1].id).toBe('item-1');
    });

    it('should use name as title if title is missing', () => {
      const items = [
        { name: 'Test Name', description: 'Desc' }
      ];
      const result = normalizeItems(items);
      expect(result[0].title).toBe('Test Name');
    });

    it('should use default values for missing fields', () => {
      const items = [{}];
      const result = normalizeItems(items);
      expect(result[0].id).toBe('item-0');
      expect(result[0].title).toBe('Untitled');
      expect(result[0].description).toBe('');
      expect(result[0].category).toBe('general');
    });

    it('should return empty array for non-array input', () => {
      expect(normalizeItems(null)).toEqual([]);
      expect(normalizeItems(undefined)).toEqual([]);
      expect(normalizeItems('not an array')).toEqual([]);
    });

    it('should use desc as description fallback', () => {
      const items = [
        { desc: 'Short description' }
      ];
      const result = normalizeItems(items);
      expect(result[0].description).toBe('Short description');
    });
  });

  describe('transformFormData', () => {
    it('should trim and lowercase email', () => {
      const formData = {
        name: '  John Doe  ',
        email: '  JOHN@EXAMPLE.COM  ',
        topic: 'general',
        message: '  Test message  '
      };
      const result = transformFormData(formData);
      expect(result.name).toBe('John Doe');
      expect(result.email).toBe('john@example.com');
      expect(result.message).toBe('Test message');
    });

    it('should use default topic if not provided', () => {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        topic: '',
        message: 'Test message'
      };
      const result = transformFormData(formData);
      expect(result.topic).toBe('general');
    });

    it('should add submittedAt timestamp', () => {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        topic: 'support',
        message: 'Test message'
      };
      const result = transformFormData(formData);
      expect(result.submittedAt).toBeDefined();
      expect(typeof result.submittedAt).toBe('string');
    });
  });

  describe('formatItemsForDisplay', () => {
    it('should uppercase title', () => {
      const items = [
        { id: '1', title: 'test', description: 'desc', category: 'cat' }
      ];
      const result = formatItemsForDisplay(items);
      expect(result[0].displayTitle).toBe('TEST');
    });

    it('should truncate long descriptions', () => {
      const items = [
        {
          id: '1',
          title: 'test',
          description: 'a'.repeat(150),
          category: 'cat'
        }
      ];
      const result = formatItemsForDisplay(items);
      expect(result[0].shortDescription).toHaveLength(103); // 100 + '...'
      expect(result[0].shortDescription.endsWith('...')).toBe(true);
    });

    it('should not truncate short descriptions', () => {
      const items = [
        { id: '1', title: 'test', description: 'short', category: 'cat' }
      ];
      const result = formatItemsForDisplay(items);
      expect(result[0].shortDescription).toBe('short');
    });
  });
});
