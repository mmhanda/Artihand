import { createSlice} from '@reduxjs/toolkit';
import e from 'express';

const initialState = localStorage.getItem('cart') ? JSON.parse(
  localStorage.getItem('cart')) : {cartItems: []}

const carteSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      
      const existItem = state.cartItems.find((e) => e._id === item._id)
      if (existItem) {
        state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
      }
      else {
        state.cartItems = [...state.cartItems, item];
      }
    }
  },
});


export default carteSlice.reducer;