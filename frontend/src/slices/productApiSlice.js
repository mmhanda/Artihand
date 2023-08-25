import { PRODUCT_URL } from "../constants";
import { ApiSlice } from "./apiSlice";

export const productApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({ url: PRODUCT_URL }),
      keepUnusedDataFor: 15,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: 'POST',
      })
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productApiSlice;