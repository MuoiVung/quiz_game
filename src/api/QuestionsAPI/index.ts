import apiSlice from "..";
import {
  AddNewQuestionRequest,
  AddNewQuestionResponse,
  GetAllQuestionsData,
  GetAllQuestionsRequest,
  GetAllQuestionsResponse,
  GetPlayQuestionsRequest,
  GetPlayQuestionsResponse,
  SubmitQuestionsRequest,
  SubmitQuestionsResponse,
  TransformCorrectAnswer,
  TransformSubmitQuestionsResponse,
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
      providesTags: [{ type: "Question", id: "LIST" }],
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
  }),
});

export const {
  useGetPlayQuestionsQuery,
  useSubmitQuestionsMutation,
  useGetAllQuestionsQuery,
  useAddNewQuestionMutation,
} = questionsApiSlice;
