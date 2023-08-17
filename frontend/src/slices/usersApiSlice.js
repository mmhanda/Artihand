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
  }),
});

export const { useLoginMutation } = usersApiSlice;