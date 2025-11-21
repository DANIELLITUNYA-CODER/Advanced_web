/**
 * API service - stub for future async data fetching
 */

/**
 * Fetch items from API (stub implementation)
 * @returns {Promise<Array>} Promise resolving to items array
 */
export async function fetchItems() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Return sample data
  return [
    {
      id: 'item-1',
      title: 'Item A',
      description: 'Detailed description for Item A with accessibility features.',
      category: 'alpha'
    },
    {
      id: 'item-2',
      title: 'Item B',
      description: 'Detailed description for Item B showcasing data patterns.',
      category: 'beta'
    },
    {
      id: 'item-3',
      title: 'Item C',
      description: 'Detailed description for Item C demonstrating layout flexibility.',
      category: 'gamma'
    }
  ];
}

/**
 * Submit form data (stub implementation)
 * @param {Object} formData - Form data to submit
 * @returns {Promise<Object>} Promise resolving to response
 */
export async function submitForm(formData) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Return success response
  return {
    success: true,
    message: 'Form submitted successfully',
    data: formData
  };
}
