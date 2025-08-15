/**
 * API Service for Barbara Shop
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('admin_token');
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

// Helper function to make API requests with error handling
const apiRequest = async (url, options = {}) => {
  const token = getAuthToken();
  
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`API Request failed for ${url}:`, error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  verify: async (token) => {
    return apiRequest('/auth/verify', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },
};

// Products API
export const productsAPI = {
  // Get all products with optional filters
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `/products?${queryString}` : '/products';
    return apiRequest(url);
  },

  // Get a specific product by ID
  getProduct: async (id) => {
    return apiRequest(`/products/${id}`);
  },

  // Create a new product (requires authentication)
  createProduct: async (productData) => {
    return apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  // Update an existing product (requires authentication)
  updateProduct: async (id, productData) => {
    return apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  // Delete a product (requires authentication)
  deleteProduct: async (id) => {
    return apiRequest(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Categories API
export const categoriesAPI = {
  // Get all categories
  getCategories: async () => {
    return apiRequest('/categories');
  },

  // Get a specific category by ID
  getCategory: async (id) => {
    return apiRequest(`/categories/${id}`);
  },

  // Create a new category (requires authentication)
  createCategory: async (categoryData) => {
    return apiRequest('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  },

  // Update an existing category (requires authentication)
  updateCategory: async (id, categoryData) => {
    return apiRequest(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
  },

  // Delete a category (requires authentication)
  deleteCategory: async (id) => {
    return apiRequest(`/categories/${id}`, {
      method: 'DELETE',
    });
  },
};

// Helper functions for common operations
export const apiHelpers = {
  // Search products by name or description
  searchProducts: async (searchTerm, filters = {}) => {
    return productsAPI.getProducts({
      search: searchTerm,
      ...filters,
    });
  },

  // Get products by category
  getProductsByCategory: async (categoryName, filters = {}) => {
    return productsAPI.getProducts({
      category: categoryName,
      ...filters,
    });
  },

  // Get featured products (highest rated)
  getFeaturedProducts: async (limit = 4) => {
    return productsAPI.getProducts({
      sort_by: 'rating',
      sort_order: 'desc',
      per_page: limit,
    });
  },

  // Get latest products
  getLatestProducts: async (limit = 4) => {
    return productsAPI.getProducts({
      sort_by: 'created_at',
      sort_order: 'desc',
      per_page: limit,
    });
  },
};

// Error handling utilities
export const apiErrors = {
  isNetworkError: (error) => {
    return error.message.includes('fetch') || error.message.includes('network');
  },

  isAuthError: (error) => {
    return error.message.includes('401') || error.message.includes('unauthorized');
  },

  isNotFoundError: (error) => {
    return error.message.includes('404') || error.message.includes('not found');
  },

  getErrorMessage: (error) => {
    if (apiErrors.isNetworkError(error)) {
      return 'Network error. Please check your connection and try again.';
    }
    if (apiErrors.isAuthError(error)) {
      return 'Authentication required. Please log in to continue.';
    }
    if (apiErrors.isNotFoundError(error)) {
      return 'The requested item was not found.';
    }
    return error.message || 'An unexpected error occurred.';
  },
};

export default {
  auth: authAPI,
  products: productsAPI,
  categories: categoriesAPI,
  helpers: apiHelpers,
  errors: apiErrors,
};

