import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../../types/data.types";
import { encryptData } from "../../utils/lsCryptoJS.util";
import { RootState } from "./../store";

export type AuthStateType = {
  user: UserType | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthStateType = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthStateType>) => {
      encryptData("auth", action.payload);
      return (state = { ...action.payload });
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.clear();
    },
    initCredentials: (state, action: PayloadAction<AuthStateType>) => {
      return (state = action.payload);
    },
  },
});

export const { setCredentials, logout, initCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
