import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const createRole = createAsyncThunk(
  'roles/create',
  async (createRole, { rejectWithValue }) => {
    try {
      const response = await api.post('/create', createRole);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllRoles = createAsyncThunk('roles/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchRoleById = createAsyncThunk('roles/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateRoleById = createAsyncThunk(
  'roles/updateById',
  async ({ id, updateRole }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/${id}`, updateRole);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRoleById = createAsyncThunk('roles/deleteById', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
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
        const role = state.roles.find((role) => role.id === action.payload.id);
        if (role) {
          Object.assign(role, action.payload);
        }
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
