// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Or use fetch

// Adjusted initial state - removed Google-specific fields
const initialState = {
  user: null,        // Store user data after successful backend login
  isLoading: false,
  error: null,
};

// Async thunk for handling the form submission and verification
// The backend endpoint might change if needed, but the core logic is similar
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, { rejectWithValue }) => {
    try {
      // Replace '/api/login/verify' or '/api/login' with your backend endpoint
      const response = await axios.post('/api/login/verify', formData);
      // Assuming the backend returns user data on successful verification
      return response.data;
    } catch (err) {
      // Handle errors (e.g., network error, validation error from backend)
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to log out or clear state - simplified
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      // Consider clearing local storage/session storage if used
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors on new attempt
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Store user data from backend
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Store the error message
        state.user = null;
      });
  },
});

// Export only relevant actions
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;