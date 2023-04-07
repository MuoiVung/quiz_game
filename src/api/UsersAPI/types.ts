import { OrderType } from "../QuestionsAPI/types";

export type UserSortFiedType =
  | "id"
  | "email"
  | "name"
  | "created_at"
  | "updated_at";

// GET ALL USER
export interface GetAllUsersRequest {
  sortField: UserSortFiedType;
  keyWord: string;
  order: OrderType;
  size: number;
  page: number;
}

export interface GetAllUsersResponse {
  statusCode: number;
  message: string;
  data: GetAllUsesResponseData;
}

export interface GetAllUsesResponseData {
  total: number;
  result: UserData[];
  totalPages: number;
  currentPage: number;
}

export interface UserData {
  id: number;
  email: string;
  name: string;
  roles: UserRoleType[];
  avatar_link: string;
  created_at: string;
  updated_at: string;
}

export type UserRoleType = "admin" | "user";

// GET USER
export interface GetUserRequest {
  userId: number;
}

export interface GetUserResponse {
  statusCode: number;
  message: string;
  data: UserData;
}

// GET USER PROFILE
export interface GetUserProfileResponse {
  statusCode: number;
  message: string;
  data: UserData;
}

// CREATE NEW USER
export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  roles: UserRoleType[];
}

export interface CreateUserResponse {
  statusCode: number;
  message: string;
  data: UserData;
}

// DELETE USER
export interface DeleteUserRequest {
  userId: number;
}

export interface DeleteUserResponse {
  statusCode: number;
  message: string;
}

// UPDATE USER
export interface UpdateUserRequest {
  userId: number;
  email: string;
  name: string;
  roles: UserRoleType[];
}

export interface UpdateUserResponse {
  statusCode: number;
  message: string;
  data: UserData;
}

// UPLOAD AVATAR
export interface UploadAvatarResponse {
  message: string;
  data: string;
  statusCode: number;
}

export interface UploadAvatarRequest {
  userId: number;
  formData: FormData;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  statusCode: number;
  message: string;
}
