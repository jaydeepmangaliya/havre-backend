import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3003/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Product API functions
export const productAPI = {
  // Get all products
  getProducts: async (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    const response = await api.get('/api/getProducts', { params });
    return response.data;
  },

  // Get single product
  getProduct: async (id: string) => {
    const response = await api.get(`/api/getProduct/${id}`);
    return response.data;
  },

  // Create product (admin only)
  createProduct: async (productData: any) => {
    const response = await api.post('/products', productData);
    return response.data;
  },

  // Update product (admin only)
  updateProduct: async (id: string, productData: any) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Delete product (admin only)
  deleteProduct: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get('/getProducts?featured=true');
    return response.data;
  },
};

// Order API functions
export const orderAPI = {
  // Get user orders
  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Get single order
  getOrder: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Create order
  createOrder: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Get all orders (admin only)
  getAllOrders: async (params?: { status?: string; page?: number; limit?: number }) => {
    const response = await api.get('/admin/orders', { params });
    return response.data;
  },

  // Update order status (admin only)
  updateOrderStatus: async (id: string, status: string) => {
    const response = await api.patch(`/admin/orders/${id}/status`, { status });
    return response.data;
  },
};

// User API functions
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData: any) => {
    const response = await api.put('/user/profile', userData);
    return response.data;
  },

  // Get all users (admin only)
  getAllUsers: async (params?: { page?: number; limit?: number }) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },
};

// Auth API functions
export const authAPI = {
  // Login
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/api/login', credentials);
    return response.data;
  },

  // Register
  register: async (userData: { email: string; password: string; firstname: string; lastname: string; phone: string; confrompassword: string }) => {
    const response = await api.post('/api/register', userData);
    return response.data;
  },

  // NOT IN USE
  // Logout
  // logout: async () => {
  //   const response = await api.post('/auth/logout');
  //   return response.data;
  // },

  // // Refresh token
  // refreshToken: async () => {
  //   const response = await api.post('/auth/refresh');
  //   return response.data;
  // },
};

// Admin dashboard API functions
export const adminAPI = {
  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard/stats');
    return response.data;
  },

  // Get recent activity
  getRecentActivity: async () => {
    const response = await api.get('/admin/dashboard/activity');
    return response.data;
  },

  // Get analytics data
  getAnalytics: async (period?: string) => {
    const response = await api.get('/admin/analytics', { params: { period } });
    return response.data;
  },
};

export default api;
