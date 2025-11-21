/**
 * Deep freeze utility for immutability
 * Recursively freezes an object and all its nested properties
 */

/**
 * Deeply freeze an object to prevent mutations
 * @param {*} obj - Object to freeze
 * @returns {*} Frozen object
 */
export function deepFreeze(obj) {
  // Primitives and null don't need freezing
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Freeze the object itself
  Object.freeze(obj);

  // Recursively freeze all properties
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== null && typeof obj[key] === 'object') {
      deepFreeze(obj[key]);
    }
  });

  return obj;
}
