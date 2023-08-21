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
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  })
});

export const { useCreatOrderMutation, useGetOrderDetailsQuery } = ordersApiSlice;