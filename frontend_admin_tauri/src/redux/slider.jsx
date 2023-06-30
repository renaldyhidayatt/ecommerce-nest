import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { myApi } from '../helpers/api';

export const fetchAllSliders = createAsyncThunk(
  'sliders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await myApi.get('/slider');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSliderById = createAsyncThunk(
  'sliders/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await myApi.get(`/slider/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSlider = createAsyncThunk(
  'sliders/create',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await myApi.post('/create', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSliderById = createAsyncThunk(
  'sliders/updateById',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await myApi.put(`/slider/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSliderById = createAsyncThunk(
  'sliders/deleteById',
  async (id, { rejectWithValue }) => {
    try {
      await myApi.delete(`/slider/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const slidersSlice = createSlice({
  name: 'sliders',
  initialState: {
    slider: {},
    sliders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSliders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSliders.fulfilled, (state, action) => {
        state.loading = false;
        state.sliders = action.payload;
      })
      .addCase(fetchAllSliders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSliderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliderById.fulfilled, (state, action) => {
        state.loading = false;
        state.slider = action.payload;
      })
      .addCase(fetchSliderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSlider.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSlider.fulfilled, (state, action) => {
        state.loading = false;
        state.sliders.push(action.payload);
      })
      .addCase(createSlider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSliderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSliderById.fulfilled, (state, action) => {
        state.loading = false;
        const slider = state.sliders.find(
          (slider) => slider.id === action.payload.id
        );
        if (slider) {
          Object.assign(slider, action.payload);
        }
      })
      .addCase(updateSliderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSliderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSliderById.fulfilled, (state, action) => {
        state.loading = false;
        state.sliders = state.sliders.filter(
          (slider) => slider.id !== action.payload
        );
      })
      .addCase(deleteSliderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default slidersSlice.reducer;
