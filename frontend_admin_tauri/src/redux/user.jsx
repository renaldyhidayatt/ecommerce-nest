import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const createUser = createAsyncThunk(
  'users/create',
  async (createUserData, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/create', createUserData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/user/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserById = createAsyncThunk(
  'users/updateById',
  async ({ id, updateUser, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('updateUser', JSON.stringify(updateUser));

      const response = await api.put(`/user/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUserById = createAsyncThunk(
  'users/deleteById',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/user/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        const user = state.users.find((user) => user.id === action.payload.id);
        if (user) {
          Object.assign(user, action.payload);
        }
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        const user = state.users.find((user) => user.id === action.payload.id);
        if (user) {
          Object.assign(user, action.payload);
        }
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
