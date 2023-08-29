import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { ApiSlice } from "./apiSlice";

export const productApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ( { pageNumber, keyword } ) => ({
        url: PRODUCT_URL,
        params: { pageNumber, keyword },
      }),
      keepUnusedDataFor: 2,
      providesTags: ['Product'],
    }),

    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'], // this is for stop it from caching and always bring new data
    }),

    updateProduct: builder.mutation({
      query: (productDetails) => ({
        url: `${PRODUCT_URL}/${productDetails._id}`,
        method: 'PUT',
        body: productDetails
      }),
      invalidatesTags: ['Product'],
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),

    createProductReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data._id}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    })
  }),
});

export const { useGetProductsQuery, useCreateProductMutation,
                useUpdateProductMutation, useUploadProductImageMutation,
                  useDeleteProductMutation, useCreateProductReviewMutation } = productApiSlice;