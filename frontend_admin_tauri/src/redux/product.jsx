import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Import your API functions or services here

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const createProduct = createAsyncThunk(
  'products/create',
  async ({ createProduct, file }, { rejectWithValue }) => {
    try {
      const response = await api.post('/create', createProduct, file);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProductById = createAsyncThunk(
  'products/updateById',
  async ({ id, updateProduct, file }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/${id}`, updateProduct, file);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const deleteProductById = createAsyncThunk('products/deleteById', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/${id}`);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        const product = state.products.find((product) => product.id === action.payload.id);
        if (product) {
          Object.assign(product, action.payload);
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.loading = false;
        const product = state.products.find((product) => product.id === action.payload.id);
        if (product) {
          Object.assign(product, action.payload);
        }
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product.id !== action.payload);
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
