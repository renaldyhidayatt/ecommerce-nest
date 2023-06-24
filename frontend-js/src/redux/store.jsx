import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import sliderReducer from './slider';
import categoryReducer from './category';
import productReducer from './product';
import cartReducer from './cart';
import orderReducer from './order';

const store = configureStore({
  reducer: {
    auth: authReducer,
    slider: sliderReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

export default store;
