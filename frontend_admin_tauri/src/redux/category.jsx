import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Import your API functions or services here

export const fetchAllCategories = createAsyncThunk('categories/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchCategoryById = createAsyncThunk('categories/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const createCategory = createAsyncThunk(
  'categories/create',
  async ({ createCategory, file }, { rejectWithValue }) => {
    try {
      const response = await api.post('/create', createCategory, file);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategoryById = createAsyncThunk(
  'categories/updateById',
  async ({ id, updateCategoryDto, file }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/${id}`, updateCategoryDto, file);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategoryById = createAsyncThunk('categories/deleteById', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        const category = state.categories.find((category) => category.id === action.payload.id);
        if (category) {
          Object.assign(category, action.payload);
        }
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        const category = state.categories.find((category) => category.id === action.payload.id);
        if (category) {
          Object.assign(category, action.payload);
        }
      })
      .addCase(updateCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter((category) => category.id !== action.payload);
      })
      .addCase(deleteCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
