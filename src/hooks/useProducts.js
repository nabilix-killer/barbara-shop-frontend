/**
 * Custom React hook for managing product data
 * Provides loading states, error handling, and data fetching
 */

import { useState, useEffect, useCallback } from 'react';
import { productsAPI, categoriesAPI, apiHelpers, apiErrors } from '../services/api';

export const useProducts = (initialFilters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  // Fetch products with current filters
  const fetchProducts = useCallback(async (newFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const currentFilters = { ...filters, ...newFilters };
      const response = await productsAPI.getProducts(currentFilters);
      
      setProducts(response.products || []);
      setPagination(response.pagination || null);
      setFilters(currentFilters);
    } catch (err) {
      setError(apiErrors.getErrorMessage(err));
      setProducts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Update filters and refetch
  const updateFilters = useCallback((newFilters) => {
    fetchProducts(newFilters);
  }, [fetchProducts]);

  // Search products
  const searchProducts = useCallback((searchTerm) => {
    updateFilters({ ...filters, search: searchTerm, page: 1 });
  }, [filters, updateFilters]);

  // Filter by category
  const filterByCategory = useCallback((category) => {
    updateFilters({ ...filters, category, page: 1 });
  }, [filters, updateFilters]);

  // Sort products
  const sortProducts = useCallback((sortBy, sortOrder = 'desc') => {
    updateFilters({ ...filters, sort_by: sortBy, sort_order: sortOrder, page: 1 });
  }, [filters, updateFilters]);

  // Load more products (pagination)
  const loadMore = useCallback(() => {
    if (pagination && pagination.has_next) {
      updateFilters({ ...filters, page: pagination.page + 1 });
    }
  }, [filters, pagination, updateFilters]);

  // Refresh products
  const refresh = useCallback(() => {
    fetchProducts(filters);
  }, [fetchProducts, filters]);

  return {
    products,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    searchProducts,
    filterByCategory,
    sortProducts,
    loadMore,
    refresh,
  };
};

export const useProduct = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const productData = await productsAPI.getProduct(productId);
        setProduct(productData);
      } catch (err) {
        setError(apiErrors.getErrorMessage(err));
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const refresh = useCallback(() => {
    if (productId) {
      const fetchProduct = async () => {
        setLoading(true);
        setError(null);

        try {
          const productData = await productsAPI.getProduct(productId);
          setProduct(productData);
        } catch (err) {
          setError(apiErrors.getErrorMessage(err));
          setProduct(null);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [productId]);

  return {
    product,
    loading,
    error,
    refresh,
  };
};

export const useFeaturedProducts = (limit = 4) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await apiHelpers.getFeaturedProducts(limit);
        setProducts(response.products || []);
      } catch (err) {
        setError(apiErrors.getErrorMessage(err));
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [limit]);

  return {
    products,
    loading,
    error,
  };
};

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await categoriesAPI.getCategories();
        setCategories(response.categories || []);
      } catch (err) {
        setError(apiErrors.getErrorMessage(err));
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await categoriesAPI.getCategories();
      setCategories(response.categories || []);
    } catch (err) {
      setError(apiErrors.getErrorMessage(err));
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    categories,
    loading,
    error,
    refresh,
  };
};

