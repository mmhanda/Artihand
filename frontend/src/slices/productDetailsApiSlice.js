import { ApiSlice } from "./apiSlice";
import { PRODUCT_URL } from "../constants";

export const productDetailsApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getproductDetails: builder.query({
      query: () => ({url: PRODUCT_URL}),
      keepUnusedDataFor: 15,
    }),
  }),
});

export const { useGetproductDetailsQuery } = productDetailsApiSlice;