/**
 * Unit tests for validation functions
 */

import { describe, it, expect } from 'vitest';
import { required, isEmail, validateForm, isFormValid } from '../../src/models/validation.js';

describe('Validation', () => {
  describe('required', () => {
    it('should return true for non-empty string', () => {
      expect(required('test')).toBe(true);
    });

    it('should return false for empty string', () => {
      expect(required('')).toBe(false);
    });

    it('should return false for whitespace-only string', () => {
      expect(required('   ')).toBe(false);
    });

    it('should return true for non-null values', () => {
      expect(required(123)).toBe(true);
      expect(required(true)).toBe(true);
    });

    it('should return false for null or undefined', () => {
      expect(required(null)).toBe(false);
      expect(required(undefined)).toBe(false);
    });
  });

  describe('isEmail', () => {
    it('should return true for valid email', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should return false for invalid email', () => {
      expect(isEmail('test')).toBe(false);
      expect(isEmail('test@')).toBe(false);
      expect(isEmail('@example.com')).toBe(false);
      expect(isEmail('test@example')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isEmail('')).toBe(false);
    });
  });

  describe('validateForm', () => {
    it('should return empty errors for valid form', () => {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        topic: 'general',
        message: 'Test message'
      };
      const errors = validateForm(formData);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('should return error for missing name', () => {
      const formData = {
        name: '',
        email: 'john@example.com',
        topic: 'general',
        message: 'Test message'
      };
      const errors = validateForm(formData);
      expect(errors.name).toBe('Name is required');
    });

    it('should return error for missing email', () => {
      const formData = {
        name: 'John Doe',
        email: '',
        topic: 'general',
        message: 'Test message'
      };
      const errors = validateForm(formData);
      expect(errors.email).toBe('Email is required');
    });

    it('should return error for invalid email', () => {
      const formData = {
        name: 'John Doe',
        email: 'invalid-email',
        topic: 'general',
        message: 'Test message'
      };
      const errors = validateForm(formData);
      expect(errors.email).toBe('Email is invalid');
    });

    it('should return error for missing message', () => {
      const formData = {
        name: 'John Doe',
        email: 'john@example.com',
        topic: 'general',
        message: ''
      };
      const errors = validateForm(formData);
      expect(errors.message).toBe('Message is required');
    });

    it('should return multiple errors', () => {
      const formData = {
        name: '',
        email: 'invalid',
        topic: 'general',
        message: ''
      };
      const errors = validateForm(formData);
      expect(errors.name).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.message).toBeDefined();
    });
  });

  describe('isFormValid', () => {
    it('should return true for empty errors object', () => {
      expect(isFormValid({})).toBe(true);
    });

    it('should return false for errors object with errors', () => {
      expect(isFormValid({ name: 'Error' })).toBe(false);
    });
  });
});
