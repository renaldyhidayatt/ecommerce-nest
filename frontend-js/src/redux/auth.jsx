import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { myApi } from '../helpers/api';
import { decodeToken } from '../helpers/decode';

export const loginAction = createAsyncThunk(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await myApi.post('/auth/login', loginData);
      const token = response.data.token;

      console.log(response.data);
      localStorage.setItem('token', token);
      const user = decodeToken(token);
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerAction = createAsyncThunk(
  'auth/register',
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await myApi.post('/auth/register', registerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('token');
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const token = localStorage.getItem('token') || null;
const initialUser = token ? decodeToken(token) : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token,
    user: initialUser,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
