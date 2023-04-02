import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { logout, setCredentials } from "../store/features/authSlice";
import store, { RootState } from "../store/store";
import { RefreshTokenResponse } from "./AuthAPI/types";

const BASE_URL = process.env.REACT_APP_BASE_URL || "";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const authState = store.getState().auth;
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // try to get a new token
        console.log("get a new token");
        const refreshResult = await baseQuery(
          {
            url: "/authentication/refresh-token",
            method: "POST",
            body: { refresh_token: authState.refreshToken },
          },
          api,
          extraOptions
        );

        const refreshResultData = refreshResult?.data as RefreshTokenResponse;

        if (refreshResultData) {
          // store the new token
          api.dispatch(
            setCredentials({
              ...authState,
              accessToken: refreshResultData?.data?.newTokens?.access_token,
              refreshToken: refreshResultData?.data?.newTokens?.refresh_token,
            })
          );
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          console.log("get new token failed");
          api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
});

export default apiSlice;
