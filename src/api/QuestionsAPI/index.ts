import apiSlice from "..";
import {
  AddNewQuestionRequest,
  AddNewQuestionResponse,
  DeleteQuestionRequest,
  DeleteQuestionResponse,
  GetAllQuestionsData,
  GetAllQuestionsRequest,
  GetAllQuestionsResponse,
  GetPlayQuestionsRequest,
  GetPlayQuestionsResponse,
  GetQuestionRequest,
  GetQuestionResponse,
  SubmitQuestionsRequest,
  SubmitQuestionsResponse,
  TransformCorrectAnswer,
  TransformSubmitQuestionsResponse,
  UpdateQuestionRequest,
  UpdateQuestionResponse,
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
      TransformSubmitQuestionsResponse,
      SubmitQuestionsRequest
    >({
      query: (body) => ({
        url: "questions/submit",
        method: "POST",
        body,
      }),
      transformResponse: (response: SubmitQuestionsResponse) => {
        const { data } = response;

        const answers: TransformCorrectAnswer[] = data.listQuestionChecked.map(
          (checkedQuestion) => {
            const { title, answers } = checkedQuestion;
            const answerContents: string[] = [];
            const correctAnswerContents: string[] = [];

            for (const ans of answers) {
              if (ans.hasOwnProperty("is_submit_correct")) {
                answerContents.push(ans.content);
              }
              if (ans.is_correct) {
                correctAnswerContents.push(ans.content);
              }
            }

            return {
              question: title,
              answers: answerContents,
              correctAnswers: correctAnswerContents,
            };
          }
        );

        return {
          answers,
          totalScore: data.totalScore,
        };
      },
    }),
    getAllQuestions: builder.query<
      GetAllQuestionsData,
      Partial<GetAllQuestionsRequest>
    >({
      query: (params) => ({
        url: "questions",
        method: "GET",
        params,
      }),
      transformResponse: (response: GetAllQuestionsResponse) => {
        return response.data;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.result.map(({ id }) => ({
                type: "Question" as const,
                id,
              })),
              { type: "Question", id: "LIST" },
            ]
          : [{ type: "Question", id: "LIST" }],
      keepUnusedDataFor: 600000,
    }),
    addNewQuestion: builder.mutation<
      AddNewQuestionResponse,
      AddNewQuestionRequest
    >({
      query: (body) => ({
        url: "questions",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),
    deleteQuestion: builder.mutation<
      DeleteQuestionResponse,
      DeleteQuestionRequest
    >({
      query: ({ questionId }) => ({
        url: `questions/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Question", id: "LIST" },
      ],
    }),
    getQuestion: builder.query<GetQuestionResponse, GetQuestionRequest>({
      query: ({ questionId }) => `questions/${questionId}`,
      providesTags: (result, error, arg) => [
        { type: "Question", id: arg.questionId },
      ],
    }),
    updateQuestion: builder.mutation<
      UpdateQuestionResponse,
      UpdateQuestionRequest
    >({
      query: ({ questionId, title, thumbnail_link }) => ({
        url: `questions/${questionId}`,
        method: "PATCH",
        body: {
          title,
          thumbnail_link,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Question", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetPlayQuestionsQuery,
  useSubmitQuestionsMutation,
  useGetAllQuestionsQuery,
  useGetQuestionQuery,
  useAddNewQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} = questionsApiSlice;
