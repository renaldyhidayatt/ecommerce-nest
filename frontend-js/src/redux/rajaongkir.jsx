import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { myApi } from '../helpers/api';

export const fetchProvinces = createAsyncThunk(
  'rajaOngkir/fetchProvinces',
  async () => {
    try {
      const response = await myApi.get('/raja-ongkir');
      console.log('raja-ongkir', response.data.results);
      return response.data.rajaongkir.results;
    } catch (error) {
      throw new Error('Error fetching provinces:', error);
    }
  }
);

export const fetchCities = createAsyncThunk(
  'rajaOngkir/fetchCities',
  async (provId) => {
    try {
      const response = await myApi.get(`/raja-ongkir/kota/${provId}`);

      console.log('raja-ongkir-city', response.data.rajaongkir.results);
      return response.data.rajaongkir.results;
    } catch (error) {
      throw new Error('Error fetching cities:', error);
    }
  }
);

export const calculateShippingCost = createAsyncThunk(
  'rajaOngkir/calculateShippingCost',
  async ({ asal, tujuan, berat, kurir }) => {
    try {
      const response = await myApi.get(
        `/raja-ongkir/ongkos/${asal}/${tujuan}/${berat}/${kurir}`
      );
      console.log('raja-ongkir-cost', response.data.rajaongkir.results);
      return response.data.rajaongkir.results;
    } catch (error) {
      throw new Error('Error calculating shipping cost:', error);
    }
  }
);

const initialState = {
  provinces: [],
  cities: [],
  shippingCosts: [],
  loading: false,
  error: null,
};

const rajaOngkirSlice = createSlice({
  name: 'rajaOngkir',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvinces.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.loading = false;
        state.provinces = action.payload;
      })
      .addCase(fetchProvinces.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(calculateShippingCost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateShippingCost.fulfilled, (state, action) => {
        state.loading = false;
        state.shippingCosts = action.payload;
      })
      .addCase(calculateShippingCost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rajaOngkirSlice.reducer;
