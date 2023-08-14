import { createSlice} from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(
  localStorage.getItem('cart')) : {cartItems: []}

const carteSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      return updateCart(state, action);
    },
  },
});


export const { addToCart } = carteSlice.actions;
export default carteSlice.reducer;