import apiSlice from "..";
import {
  GetPlayQuestionsRequest,
  GetPlayQuestionsResponse,
  SubmitQuestionsRequest,
  SubmitQuestionsResponse,
} from "./types";

export const questionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayQuestions: builder.query<
      GetPlayQuestionsResponse,
      GetPlayQuestionsRequest
    >({
      query: (arg) => `questions/play?total=${arg.total}`,
    }),
    submitQuestions: builder.mutation<
      SubmitQuestionsResponse,
      SubmitQuestionsRequest
    >({
      query: (body) => ({
        url: "questions/submit",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetPlayQuestionsQuery, useSubmitQuestionsMutation } =
  questionsApiSlice;
