/**
 * Product Form Component
 * Handles both adding new products and editing existing ones
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Save, Loader2, Package, Upload } from 'lucide-react';
import { productsAPI, categoriesAPI, apiErrors } from '../../services/api';
import { useCategories } from '../../hooks/useProducts';

const ProductForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories } = useCategories();
  
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(mode === 'edit');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    in_stock: true,
    rating: '4.5',
    reviews_count: '0',
    features: ''
  });
  
  const [validationErrors, setValidationErrors] = useState({});

  // Load product data for editing
  useEffect(() => {
    if (mode === 'edit' && id) {
      loadProduct();
    }
  }, [mode, id]);

  const loadProduct = async () => {
    setInitialLoading(true);
    try {
      const product = await productsAPI.getProduct(id);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category_id: product.category_id?.toString() || '',
        image_url: product.image_url || '',
        in_stock: product.in_stock ?? true,
        rating: product.rating?.toString() || '4.5',
        reviews_count: product.reviews_count?.toString() || '0',
        features: Array.isArray(product.features) ? product.features.join(', ') : (product.features || '')
      });
    } catch (err) {
      setError(`Failed to load product: ${apiErrors.getErrorMessage(err)}`);
    } finally {
      setInitialLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Product name is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      errors.price = 'Valid price is required';
    }
    
    if (!formData.category_id) {
      errors.category_id = 'Category is required';
    }
    
    if (!formData.image_url.trim()) {
      errors.image_url = 'Image URL is required';
    }
    
    if (!formData.rating || isNaN(parseFloat(formData.rating)) || parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5) {
      errors.rating = 'Rating must be between 0 and 5';
    }
    
    if (!formData.reviews_count || isNaN(parseInt(formData.reviews_count)) || parseInt(formData.reviews_count) < 0) {
      errors.reviews_count = 'Reviews count must be a positive number';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear general error
    if (error) {
      setError(null);
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSwitchChange = (name, checked) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Prepare data for API
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        category_id: parseInt(formData.category_id),
        image_url: formData.image_url.trim(),
        in_stock: formData.in_stock,
        rating: parseFloat(formData.rating),
        reviews_count: parseInt(formData.reviews_count),
        features: formData.features.split(',').map(f => f.trim()).filter(f => f)
      };

      if (mode === 'edit') {
        await productsAPI.updateProduct(id, productData);
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
      } else {
        await productsAPI.createProduct(productData);
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1500);
      }
    } catch (err) {
      setError(apiErrors.getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={() => navigate('/admin/dashboard')} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-4">
              <Package className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {mode === 'edit' ? 'Edit Product' : 'Add New Product'}
                </h1>
                <p className="text-sm text-gray-500">
                  {mode === 'edit' ? 'Update product information' : 'Create a new product for your store'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>
              Fill in the details below to {mode === 'edit' ? 'update' : 'create'} your product
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-6 border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">
                  Product {mode === 'edit' ? 'updated' : 'created'} successfully! Redirecting...
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={validationErrors.name ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {validationErrors.name && (
                    <p className="text-sm text-red-600">{validationErrors.name}</p>
                  )}
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={validationErrors.price ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {validationErrors.price && (
                    <p className="text-sm text-red-600">{validationErrors.price}</p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category_id">Category *</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => handleSelectChange('category_id', value)}
                    disabled={loading}
                  >
                    <SelectTrigger className={validationErrors.category_id ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {validationErrors.category_id && (
                    <p className="text-sm text-red-600">{validationErrors.category_id}</p>
                  )}
                </div>

                {/* In Stock */}
                <div className="space-y-2">
                  <Label htmlFor="in_stock">Availability</Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="in_stock"
                      checked={formData.in_stock}
                      onCheckedChange={(checked) => handleSwitchChange('in_stock', checked)}
                      disabled={loading}
                    />
                    <Label htmlFor="in_stock" className="text-sm">
                      {formData.in_stock ? 'In Stock' : 'Out of Stock'}
                    </Label>
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5) *</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="4.5"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className={validationErrors.rating ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {validationErrors.rating && (
                    <p className="text-sm text-red-600">{validationErrors.rating}</p>
                  )}
                </div>

                {/* Reviews Count */}
                <div className="space-y-2">
                  <Label htmlFor="reviews_count">Reviews Count *</Label>
                  <Input
                    id="reviews_count"
                    name="reviews_count"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.reviews_count}
                    onChange={handleInputChange}
                    className={validationErrors.reviews_count ? 'border-red-500' : ''}
                    disabled={loading}
                  />
                  {validationErrors.reviews_count && (
                    <p className="text-sm text-red-600">{validationErrors.reviews_count}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter product description"
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className={validationErrors.description ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {validationErrors.description && (
                  <p className="text-sm text-red-600">{validationErrors.description}</p>
                )}
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL *</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className={validationErrors.image_url ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {validationErrors.image_url && (
                  <p className="text-sm text-red-600">{validationErrors.image_url}</p>
                )}
                {formData.image_url && (
                  <div className="mt-2">
                    <img
                      src={formData.image_url}
                      alt="Product preview"
                      className="w-32 h-32 object-cover rounded-lg border"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Textarea
                  id="features"
                  name="features"
                  placeholder="Premium quality, Comfortable fit, Machine washable"
                  rows={3}
                  value={formData.features}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <p className="text-sm text-gray-500">
                  Separate each feature with a comma
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin/dashboard')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {mode === 'edit' ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      {mode === 'edit' ? 'Update Product' : 'Create Product'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductForm;

