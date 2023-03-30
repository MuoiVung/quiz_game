import apiSlice from "..";
import { AuthStateType } from "./../../store/features/authSlice";
import { RoleType } from "./../../types/data.types";
import {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types";

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
    signup: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (credentials) => ({
        url: "authentication/register",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<LogoutResponse, LogoutRequest>({
      query: (refreshToken) => ({
        url: "authentication/logout",
        method: "POST",
        body: refreshToken,
      }),
    }),
    resetPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (credentials) => ({
        url: "authentication/forgot-password",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApiSlice;
