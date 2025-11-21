/**
 * Validation functions - pure functions for form validation
 */

/**
 * Check if value is not empty
 * @param {*} value - Value to check
 * @returns {boolean} True if value is not empty
 */
export function required(value) {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value != null && value !== '';
}

/**
 * Check if value is a valid email
 * @param {string} value - Email value to check
 * @returns {boolean} True if valid email format
 */
export function isEmail(value) {
  if (!value) return false;
  // Simple email regex - matches most common email formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

/**
 * Validate entire form
 * @param {Object} formData - Form data object
 * @returns {Object} Validation errors object
 */
export function validateForm(formData) {
  const errors = {};

  if (!required(formData.name)) {
    errors.name = 'Name is required';
  }

  if (!required(formData.email)) {
    errors.email = 'Email is required';
  } else if (!isEmail(formData.email)) {
    errors.email = 'Email is invalid';
  }

  if (!required(formData.message)) {
    errors.message = 'Message is required';
  }

  return errors;
}

/**
 * Check if form has any errors
 * @param {Object} errors - Errors object from validateForm
 * @returns {boolean} True if form is valid (no errors)
 */
export function isFormValid(errors) {
  return Object.keys(errors).length === 0;
}
