import apiSlice from "..";
import {
  ChangePasswordRequest,
  ChangePasswordResponse,
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetAllUsersRequest,
  GetAllUsersResponse,
  GetAllUsesResponseData,
  GetUserProfileResponse,
  GetUserRequest,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UploadAvatarRequest,
  UploadAvatarResponse,
  UserData,
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
    getUserProfle: builder.query<UserData, void>({
      query: () => "user/my-profile",
      providesTags: (result) => [{ type: "User", id: result?.id }],
      transformResponse: (response: GetUserProfileResponse) => response.data,
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
    uploadAvatar: builder.mutation<UploadAvatarResponse, UploadAvatarRequest>({
      query: ({ formData }) => ({
        url: "user/upload-avatar",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.userId },
      ],
    }),
    changePassword: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: "user/change-password",
        method: "PATCH",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetUserProfleQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useUploadAvatarMutation,
  useChangePasswordMutation,
} = usersApiSlice;
