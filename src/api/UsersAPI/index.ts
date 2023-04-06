import { result } from "lodash";
import apiSlice from "..";
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetAllUsersRequest,
  GetAllUsersResponse,
  GetAllUsesResponseData,
  GetUserRequest,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from "./types";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetAllUsesResponseData, GetAllUsersRequest>({
      query: (params) => ({
        url: "user",
        method: "GET",
        params,
      }),
      transformResponse: (response: GetAllUsersResponse) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.result.map(({ id }) => ({
                type: "User" as const,
                id,
              })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),
    getUser: builder.query<GetUserResponse, GetUserRequest>({
      query: ({ userId }) => `user/${userId}`,
      providesTags: (result, error, arg) => [{ type: "User", id: arg.userId }],
    }),
    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: (body) => ({
        url: "user",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    deleteUser: builder.mutation<DeleteUserResponse, DeleteUserRequest>({
      query: ({ userId }) => ({
        url: `user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: ({ userId, ...body }) => ({
        url: `user/${userId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.userId },
      ],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
