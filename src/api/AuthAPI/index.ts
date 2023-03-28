import { LoginRequest, LoginResponse } from "./types";
import apiSlice from "$api";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "authentication/login",
        method: "POST",
        body: credentials,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {},
    }),
  }),
});
