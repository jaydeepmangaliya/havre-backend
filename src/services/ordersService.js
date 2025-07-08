import api from '../config/api';

 // in use api - getOrders , updateOrderStatus



export const ordersService = {
  // Get all orders with pagination and filters
  getOrders: async (params = {}) => {
    try {
      const response = await api.get('/api/getOrders', { params });
      return {
        success: true,
        data: response.data.orders || response.data.data || [],
        pagination: response.data.pagination || {
          current: 1,
          pageSize: 10,
          total: response.data.orders?.length || 0
        },
        total: response.data.total || response.data.orders?.length || 0
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch orders'
      };
    }
  },

  // Get single order by ID
  getOrder: async (orderId) => {
    try {
      const response = await api.get(`/api/orders/${orderId}`);
      return {
        success: true,
        data: response.data.order || response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch order'
      };
    }
  },

  // Create new order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/api/orders', orderData);
      return {
        success: true,
        data: response.data.order || response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create order'
      };
    }
  },

  // Update order
  updateOrder: async (orderId, orderData) => {
    try {
      const response = await api.put(`/api/orders/${orderId}`, orderData);
      return {
        success: true,
        data: response.data.order || response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update order'
      };
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await api.patch(`/api/orders/${orderId}/status`, { status });
      return {
        success: true,
        data: response.data.order || response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update order status'
      };
    }
  },

  // Delete order
  deleteOrder: async (orderId) => {
    try {
      await api.delete(`/api/orders/${orderId}`);
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete order'
      };
    }
  },

  // Get order statistics
  getOrderStats: async (period = 'month') => {
    try {
      const response = await api.get(`/api/orders/stats?period=${period}`);
      return {
        success: true,
        data: response.data.stats || response.data.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch order statistics'
      };
    }
  },

  // Search orders
  searchOrders: async (query, filters = {}) => {
    try {
      const response = await api.get('/api/orders/search', {
        params: { q: query, ...filters }
      });
      return {
        success: true,
        data: response.data.orders || response.data.data || [],
        total: response.data.total || 0
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to search orders'
      };
    }
  },

  // Export orders
  exportOrders: async (format = 'csv', filters = {}) => {
    try {
      const response = await api.get('/api/orders/export', {
        params: { format, ...filters },
        responseType: format === 'csv' ? 'blob' : 'json'
      });
      return {
        success: true,
        data: response.data,
        filename: response.headers['content-disposition']?.split('filename=')[1] || `orders.${format}`
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to export orders'
      };
    }
  }
};
