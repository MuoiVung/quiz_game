import apiSlice from "..";
import {
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
  }),
});

export const { useGetPlayQuestionsQuery, useSubmitQuestionsMutation } =
  questionsApiSlice;
