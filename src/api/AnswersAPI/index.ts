import {
  AddNewAnswerResponse,
  AddNewAnswerRequest,
  UpdateAnswerResponse,
  UpdateAnswerRequest,
} from "./types";
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
    updateAnswer: builder.mutation<UpdateAnswerResponse, UpdateAnswerRequest>({
      query: ({ answerId, ...body }) => ({
        url: `answers/${answerId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Question", id: arg.questionId },
      ],
    }),
  }),
});

export const { useAddNewAnswerMutation, useUpdateAnswerMutation } =
  answersApiSlice;
