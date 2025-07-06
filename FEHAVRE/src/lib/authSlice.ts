import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginPayload, SignupPayload, User } from './types';
import { v4 as uuidv4 } from 'uuid';

const loadAuth = (): AuthState => {
  try {
    const data = localStorage.getItem('auth');
    if (data) return JSON.parse(data);
  } catch {}
  return {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
  };
};

const saveAuth = (state: AuthState) => {
  try {
    localStorage.setItem('auth', JSON.stringify({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      loading: false,
      error: null,
    }));
  } catch {}
};

const initialState: AuthState = loadAuth();

// Add updateProfile thunk
export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (payload: Partial<User>, { getState, rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const state = getState() as { auth: AuthState };
    if (!state.auth.user) return rejectWithValue('Not authenticated');
    return { ...state.auth.user, ...payload };
  }
);

// Simulate async login
export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (payload.email === 'admin@bakery.com' && payload.password === 'admin') {
      return {
        id: 'admin-id',
        email: payload.email,
        name: 'Admin User',
        firstName: 'Admin',
        lastName: 'User',
        phone: '',
        address: {},
        role: 'admin',
        createdAt: new Date().toISOString(),
      };
    } else if (payload.email && payload.password) {
      return {
        id: uuidv4(),
        email: payload.email,
        name: payload.email.split('@')[0],
        firstName: '',
        lastName: '',
        phone: '',
        address: {},
        role: 'customer',
        createdAt: new Date().toISOString(),
      };
    } else {
      return rejectWithValue('Invalid email or password');
    }
  }
);

// Simulate async signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (payload: SignupPayload, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (payload.email && payload.password && payload.name) {
      return {
        id: uuidv4(),
        email: payload.email,
        name: payload.name,
        firstName: payload.name.split(' ')[0],
        lastName: payload.name.split(' ').slice(1).join(' '),
        phone: '',
        address: {},
        role: 'customer',
        createdAt: new Date().toISOString(),
      };
    } else {
      return rejectWithValue('Please fill all fields');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      saveAuth(state);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        saveAuth(state);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        saveAuth(state);
      })
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        saveAuth(state);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        saveAuth(state);
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        saveAuth(state);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        saveAuth(state);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer; 