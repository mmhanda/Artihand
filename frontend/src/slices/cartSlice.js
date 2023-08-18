import { createSlice} from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart') ? JSON.parse(
  localStorage.getItem('cart')) : {cartItems: [],
                                    shippingAddress: {},
                                      paymentMethod: 'PayPal'};

const carteSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      return updateCart(state, action);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});


export const { addToCart, removeFromCart, saveShippingAddress } = carteSlice.actions;
export default carteSlice.reducer;