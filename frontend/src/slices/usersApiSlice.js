import { USERS_URL } from "../constants";
import { ApiSlice } from "./apiSlice";

export const usersApiSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({ // mutation is for the POST requeste && query is for GET
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      })
    }),

    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: 'POST',
        body: data,
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      })
    }),

    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
    }),

    
  }),
});

export const { useLoginMutation, useLogoutMutation,
                  useRegisterMutation, useProfileMutation } = usersApiSlice;