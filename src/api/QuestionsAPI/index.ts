import apiSlice from "..";
import { GetPlayQuestionsRequest, GetPlayQuestionsResponse } from "./types";

export const questionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayQuestions: builder.query<
      GetPlayQuestionsResponse,
      GetPlayQuestionsRequest
    >({
      query: (arg) => `questions/play?total=${arg.total}`,
    }),
  }),
});

export const { useGetPlayQuestionsQuery } = questionsApiSlice;
