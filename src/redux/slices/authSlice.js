import { createSlice } from '@reduxjs/toolkit'

// Check localStorage for existing auth state
const getInitialAuthState = () => {
  const storedAuth = localStorage.getItem('auth');
  if (storedAuth) {
    try {
      return JSON.parse(storedAuth);
    } catch (e) {
      return { isAuthenticated: false, user: null };
    }
  }
  return { isAuthenticated: false, user: null };
}

const initialState = getInitialAuthState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Persist to localStorage
      localStorage.setItem('auth', JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      // Clear localStorage
      localStorage.removeItem('auth');
    }
  }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer



