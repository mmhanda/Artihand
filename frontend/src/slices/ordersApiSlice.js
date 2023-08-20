import { ApiSlice } from "./apiSlice";
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    creatOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        body: {...order},
        method: 'POST',
      }),
    })
  })
});

export const { useCreatOrderMutation } = ordersApiSlice;