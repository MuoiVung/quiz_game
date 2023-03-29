import apiSlice from "..";
import { AuthStateType } from "./../../store/features/authSlice";
import { RoleType } from "./../../types/data.types";
import { LoginRequest, LoginResponse } from "./types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthStateType, LoginRequest>({
      query: (credentials) => ({
        url: "authentication/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: LoginResponse) => {
        const { user, tokens } = response?.data;

        const transformResponse: AuthStateType = {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatarLink: user.avatar_link,
            roles: [...user.roles] as RoleType[],
          },
          accessToken: tokens.access_token.access_token,
          refreshToken: tokens.refresh_token.refresh_token,
        };

        return transformResponse;
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
