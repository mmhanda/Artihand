import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./slices/cartSlice";
import { ApiSlice } from "./slices/apiSlice";

const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    cart: cartSliceReducer
  },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
              .concat(ApiSlice.middleware),
  devTools: process.env.NODE_ENV === 'development' ? true : false,
});

export default store;