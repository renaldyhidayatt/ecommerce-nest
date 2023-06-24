import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { myApi } from '../helpers/api';

// Async thunk action to fetch orders
export const fetchOrdersAsync = createAsyncThunk(
  'order/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await myApi.get('/order');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const exportPdf = createAsyncThunk(
  'order/exportPdf',
  async (_, { rejectWithValue }) => {
    try {
      const response = await myApi.get('/order/export/pdf');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const exportExcel = createAsyncThunk(
  'order/exportExcel',
  async (_, { rejectWithValue }) => {
    try {
      const response = await myApi.get('/order/export/excel');

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to delete an order
export const deleteOrderAsync = createAsyncThunk(
  'order/deleteOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await myApi.delete(`/order/delete/${orderId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action to create an order
export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order, { rejectWithValue }) => {
    try {
      const response = await myApi.post('/order/create', order);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Order slice
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.order_id !== action.payload
        );
      })
      .addCase(deleteOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOrderAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
