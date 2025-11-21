/**
 * Transform functions - pure data transformation functions
 */

/**
 * Normalize data items - ensure consistent structure
 * @param {Array} items - Raw items array
 * @returns {Array} Normalized items
 */
export function normalizeItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.map((item, index) => ({
    id: item.id || `item-${index}`,
    title: item.title || item.name || 'Untitled',
    description: item.description || item.desc || '',
    category: item.category || 'general'
  }));
}

/**
 * Transform form data to submission format
 * @param {Object} formData - Raw form data
 * @returns {Object} Transformed form data
 */
export function transformFormData(formData) {
  return {
    name: formData.name.trim(),
    email: formData.email.trim().toLowerCase(),
    topic: formData.topic || 'general',
    message: formData.message.trim(),
    submittedAt: new Date().toISOString()
  };
}

/**
 * Format items for display
 * @param {Array} items - Normalized items
 * @returns {Array} Display-ready items
 */
export function formatItemsForDisplay(items) {
  return items.map(item => ({
    ...item,
    displayTitle: item.title.toUpperCase(),
    shortDescription: item.description.length > 100 
      ? item.description.slice(0, 100) + '...'
      : item.description
  }));
}
