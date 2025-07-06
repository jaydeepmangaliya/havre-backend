// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  fallbackImage?: string;
  category: string;
  inStock: boolean;
  prepTime: string;
  ingredients: string[];
  allergens: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

// Category types
export interface Category {
  id: string;
  name: string;
  value: string;
  label: string;
  icon: string;
  description: string;
}

// Cart types
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  role: 'customer' | 'admin';
  createdAt: string;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  deliveryAddress?: string;
  notes?: string;
}

// Bakery info types
export interface BakeryInfo {
  name: string;
  tagline: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  social: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  features: string[];
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

// Redux Auth Types
export interface AuthState {
  isAuthenticated: boolean;
  user: null | User;
  loading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
}
