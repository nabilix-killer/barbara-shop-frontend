/**
 * Authentication Context for Admin Management
 * Handles login, logout, and authentication state
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, apiErrors } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('admin_token');
      
      if (token) {
        try {
          const response = await authAPI.verify(token);
          if (response.valid) {
            setUser(response.user);
          } else {
            localStorage.removeItem('admin_token');
          }
        } catch (err) {
          console.error('Auth verification failed:', err);
          localStorage.removeItem('admin_token');
        }
      }
      
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(credentials);
      
      // Store token and user data
      localStorage.setItem('admin_token', response.access_token);
      setUser(response.user);
      
      return { success: true, user: response.user };
    } catch (err) {
      const errorMessage = apiErrors.getErrorMessage(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.register(userData);
      
      // Store token and user data
      localStorage.setItem('admin_token', response.access_token);
      setUser(response.user);
      
      return { success: true, user: response.user };
    } catch (err) {
      const errorMessage = apiErrors.getErrorMessage(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Clear local state regardless of API call success
      localStorage.removeItem('admin_token');
      setUser(null);
      setError(null);
    }
  };

  const getToken = () => {
    return localStorage.getItem('admin_token');
  };

  const isAuthenticated = () => {
    return !!user && !!getToken();
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    getToken,
    isAuthenticated,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

