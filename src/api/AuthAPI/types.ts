// REGISTER
export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

export interface RegisterResponse {
  statusCode: number;
  message: string;
  data: UserClass;
}

// LOGIN
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: LoginResponseData;
}

// LOGOUT
export interface LogoutRequest {
  refresh_token: string;
}

export interface LogoutResponse {
  statusCode: number;
  message: string;
}

// REFRESH TOKEN
export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  statusCode: number;
  message: string;
  data: RefreshTokenResponseData;
}

// FORGOT PASSWORD REQUEST
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  statusCode: number;
  message: string;
}

export interface LoginResponseData {
  user: UserClass;
  tokens: Tokens;
}

export interface Tokens {
  access_token: AccessToken;
  refresh_token: RefreshToken;
}

export interface AccessToken {
  access_token: string;
  expireAfter: string;
}

export interface RefreshToken {
  refresh_token: string;
  expireAfter: string;
}

export interface UserClass {
  email: string;
  name: string;
  roles: string[];
  id: number;
  avatar_link: string;
}

export interface RefreshTokenResponseData {
  newTokens: NewTokens;
}

export interface NewTokens {
  access_token: string;
  refresh_token: string;
}

export interface ErrorResponseType {
  data: {
    message: string;
    statusCode: number;
  };
  status: number;
}
