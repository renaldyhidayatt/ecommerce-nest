import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth';
import userReducer from './user';
import sliderReducer from './slider';
import roleReducer from './role';
import productReducer from './product';
import categoryReducer from './category';
import orderReducer from './order';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    slider: sliderReducer,
    role: roleReducer,
    product: productReducer,
    category: categoryReducer,
    order: orderReducer,
  },
});

export default store;
