import { createSlice } from '@reduxjs/toolkit';

const storedCartItems = localStorage.getItem('cartItems');
const initialState = storedCartItems ? JSON.parse(storedCartItems) : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const { name, price, image, quantity, user_id, email, product_id } =
        action.payload;
      const newItem = {
        name,
        price,
        image,
        quantity,
        user_id,
        email,
        product_id,
      };
      state.push(newItem);
      localStorage.setItem('cartItems', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const updatedCart = state.filter((item) => item.product_id !== productId);
      state.splice(0, state.length, ...updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.splice(0, state.length);
      localStorage.removeItem('cartItems');
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
