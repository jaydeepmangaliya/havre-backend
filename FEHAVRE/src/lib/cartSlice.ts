import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const loadCart = (): CartItem[] => {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCart = (items: CartItem[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch {}
};

const initialState: CartState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      saveCart(state.items);
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveCart(state.items);
    },
    clearCart(state) {
      state.items = [];
      saveCart(state.items);
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      saveCart(state.items);
    }
  },
});

export const { addToCart, removeFromCart, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;

// Custom hook to sync Redux cart state to localStorage
export function useCartLocalStorageSync() {
  const items = useSelector((state: RootState) => state.cart.items);
  useEffect(() => {
    saveCart(items);
  }, [items]);
} 