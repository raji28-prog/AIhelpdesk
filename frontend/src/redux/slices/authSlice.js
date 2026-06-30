import { createSlice } from '@reduxjs/toolkit';

// Retrieve initial auth state from localStorage to persist user sessions
const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

let user = null;
try {
  user = storedUser ? JSON.parse(storedUser) : null;
} catch (e) {
  console.error('Failed to parse stored user:', e);
  localStorage.removeItem('user');
}

const initialState = {
  user,
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.error = null;

      // Persist user and token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload;

      // Clear persisted data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    logout: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;

      // Clear persisted data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { authStart, authSuccess, authFailure, logout, clearError } = authSlice.actions;

export default authSlice.reducer;
