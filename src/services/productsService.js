import api from '../config/api';


// in use api - getProducts , updateProduct , createProduct , deleteProduct

export const productsService = {
  // Get all products with pagination and filters
  getProducts: async (params = {}) => {
    try {
      const response = await api.get('/api/getProducts', { params });
      console.log(response );
      
      return {
        success: true,
        data: response?.data?.data?.items || [],
        pagination:  {
          current: response?.data?.data?.pagination?.currentPage || 1,
          pageSize: response?.data?.data?.pagination?.limit || 10 ,
          total: response?.data?.data?.pagination?.totalItems || 0
        },
        total: response.data.total || response.data.products?.length || 0
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch products'
      };
    }
  },

  // Get single product by ID
  getProduct: async (productId) => {
    try {
      const response = await api.get(`/api/getProduct/${productId}`);
      return {
        success: true,
        data: response.data.product || response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch product'
      };
    }
  },

  // Create new product
  createProduct: async (productData) => {
    // if(!productData) return {
    //     success: false,
    //     error: 'Failed to create product'
    //   };
    try {
      console.log('hello',productData.get('image1'));
      
      const response = await api.post('/api/createProduct',productData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      return {
        success: true,
        data: response.data.product || response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create product'
      };
    }
  },

  // Update product
  updateProduct: async (productId, productData) => {
    try {
      // const response = await api.put(`/api/products/${productId}`, productData);
      // return {
      //   success: true,
      //   data: response.data.product || response.data.data
      // };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update product'
      };
    }
  },

  // Delete product
  deleteProduct: async (productId) => {
    try {
      await api.delete(`/api/products/${productId}`);
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete product'
      };
    }
  },

  // Upload product images
  uploadImages: async (productId, images) => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append(`images`, image);
      });

      const response = await api.post(`/api/products/${productId}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        data: response.data.images || response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to upload images'
      };
    }
  },

  // Delete product image
  deleteImage: async (productId, imageId) => {
    try {
      await api.delete(`/api/products/${productId}/images/${imageId}`);
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete image'
      };
    }
  },

  // Get product categories
  getCategories: async () => {
    try {
      const response = await api.get('/api/products/categories');
      return {
        success: true,
        data: response.data.categories || response.data.data || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch categories'
      };
    }
  },

  // Search products
  searchProducts: async (query, filters = {}) => {
    try {
      const response = await api.get('/api/products/search', {
        params: { q: query, ...filters }
      });
      return {
        success: true,
        data: response.data.products || response.data.data || [],
        total: response.data.total || 0
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to search products'
      };
    }
  },

  // Update product stock
  updateStock: async (productId, quantity) => {
    try {
      const response = await api.patch(`/api/products/${productId}/stock`, { quantity });
      return {
        success: true,
        data: response.data.product || response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update stock'
      };
    }
  },

  // Get low stock products
  getLowStockProducts: async (threshold = 10) => {
    try {
      const response = await api.get(`/api/products/low-stock?threshold=${threshold}`);
      return {
        success: true,
        data: response.data.products || response.data.data || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch low stock products'
      };
    }
  },

  // Export products
  exportProducts: async (format = 'csv', filters = {}) => {
    try {
      const response = await api.get('/api/products/export', {
        params: { format, ...filters },
        responseType: format === 'csv' ? 'blob' : 'json'
      });
      return {
        success: true,
        data: response.data,
        filename: response.headers['content-disposition']?.split('filename=')[1] || `products.${format}`
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to export products'
      };
    }
  }
};
