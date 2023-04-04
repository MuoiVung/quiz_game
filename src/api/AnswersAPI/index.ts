import { AddNewAnswerResponse, AddNewAnswerRequest } from "./types";
import apiSlice from "..";
export const answersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewAnswer: builder.mutation<AddNewAnswerResponse, AddNewAnswerRequest>({
      query: (body) => ({
        url: "answers",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),
  }),
});

export const { useAddNewAnswerMutation } = answersApiSlice;
