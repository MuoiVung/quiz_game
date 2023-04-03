// GET PLAY QUESTIONS
export interface GetPlayQuestionsRequest {
  total: string;
}

// GET ALL QUESTIONS

export type SortFieldType = "id" | "title" | "createdAt" | "updatedAt";
export type OrderType = "ASC" | "DESC";

export interface GetAllQuestionsRequest {
  sortField: SortFieldType;
  keyWord: string;
  order: OrderType;
  size: string;
  page: string;
}

export interface GetPlayQuestionsResponse {
  statusCode: number;
  message: string;
  data: GetAllQuestionsData[];
}

export interface GetAllQuestionsData {
  id: number;
  title: string;
  thumbnail_link: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  content: string;
}

// SUBMIT QUESTIONS
export interface SubmitQuestions {
  SubmitQuestionsRequest: SubmitQuestionsRequest;
  SubmitQuestionsResponse: SubmitQuestionsResponse;
}

export interface SubmitQuestionsRequest {
  listQuestionSubmitted: ListQuestionSubmitted[];
}

export interface ListQuestionSubmitted {
  id: number;
  answersSubmittedId: number[];
}

export interface SubmitQuestionsResponse {
  statusCode: number;
  message: string;
  data: SubmitQuestionsData;
}

export interface SubmitQuestionsData {
  listQuestionChecked: ListQuestionChecked[];
  totalScore: number;
}

export interface TransformSubmitQuestionsResponse {
  answers: TransformCorrectAnswer[];
  totalScore: number;
}
export interface TransformCorrectAnswer {
  question: string;
  answers: string[];
  correctAnswers: string[];
}

export interface ListQuestionChecked {
  id: number;
  title: string;
  thumbnail_link: string;
  answers: Answer[];
  numberSubmitCorrect: number;
  numberSubmitIncorrect: number;
  numberAnswersCorrect: number;
  scoreThisQuestion: number;
}

export interface Answer {
  id: number;
  content: string;
  is_correct: boolean;
  is_submit_correct?: boolean;
}

export interface GetAllQuestionsResponse {
  statusCode: number;
  message: string;
  data: GetAllQuestionsData;
}

export interface GetAllQuestionsData {
  total: number;
  result: Result[];
  totalPages: number;
  currentPage: number;
}

export interface Result {
  id: number;
  title: string;
  thumbnail_link: string;
  createdAt: string;
  updatedAt: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  content: string;
  is_correct: boolean;
  createdAt: string;
  updatedAt: string;
}
