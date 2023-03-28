import { UserType } from "./types";
import { RootState } from "./../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { user: UserType | null; token: string | null } = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      //   const { user, accessToken } = action.payload;
      //   state.user = user;
      //   state.token = accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
