import {
  QuestionSubmitted,
  TransformSubmitQuestionsResponse,
} from "./../../api/QuestionsAPI/types";
export type AnswerItemProps = {
  children: JSX.Element | JSX.Element[] | string | undefined;
};

export type ResultTableProps = {
  data: TransformSubmitQuestionsResponse | undefined;
};

export type IngameDataType = {
  submittedQuestions: QuestionSubmitted[];
  currentQuestion: number;
};
