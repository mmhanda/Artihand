import { ApiSlice } from "./apiSlice";
import { ORDERS_URL, PAYPAL_URL } from '../constants';

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
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
      })
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url:`${PAYPAL_URL}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 5,
    }),
  })
});

export const { useCreatOrderMutation, useGetOrderDetailsQuery,
                useGetPayPalClientIdQuery, usePayOrderMutation } = ordersApiSlice;