import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { myApi } from '../helpers/api';
import { decodeToken } from '../helpers/decode';

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role: any;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: any;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const loginAction = createAsyncThunk(
  'auth/login',
  async (loginData: LoginData, { rejectWithValue }) => {
    try {
      const response = await myApi.post('/auth/login', loginData);
      const token: any = response.data.token;

      console.log(response.data);
      localStorage.setItem('token', token);
      const user: any = decodeToken(token);
      return { token, user };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerAction = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await myApi.post('/auth/register', registerData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('token');
    } catch (error: any) {
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
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginAction.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerAction.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.loading = false;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      )
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
