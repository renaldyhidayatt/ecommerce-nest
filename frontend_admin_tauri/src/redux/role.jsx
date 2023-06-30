import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { myApi } from '../helpers/api';

export const createRole = createAsyncThunk(
  'roles/create',
  async (createRole, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await myApi.post('/role/create', createRole, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllRoles = createAsyncThunk(
  'roles/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      console.log(token);
      const response = await myApi.get('/role', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRoleById = createAsyncThunk(
  'roles/fetchById',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await myApi.get(`/role/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRoleById = createAsyncThunk(
  'roles/updateById',
  async ({ id, updateRole }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await myApi.put(`/role/${id}`, updateRole, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRoleById = createAsyncThunk(
  'roles/deleteById',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      await myApi.delete(`/role/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    selectedRole: {},
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRoleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoleById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRole = action.payload;
      })
      .addCase(fetchRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateRoleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoleById.fulfilled, (state, action) => {
        state.loading = false;
        const role = state.roles.find((role) => role.id === action.payload.id);
        if (role) {
          Object.assign(role, action.payload);
        }
      })
      .addCase(updateRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRoleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoleById.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = state.roles.filter((role) => role.id !== action.payload);
      })
      .addCase(deleteRoleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rolesSlice.reducer;
