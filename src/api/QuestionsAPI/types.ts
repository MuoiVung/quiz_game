// GET PLAY QUESTIONS
export interface GetPlayQuestionsRequest {
  total: string;
}

export interface GetPlayQuestionsResponse {
  statusCode: number;
  message: string;
  data: GetPlayQuestionData[];
}

export interface GetPlayQuestionData {
  id: number;
  title: string;
  thumbnail_link: string;
  answers: GetPlayQuestionAnswer[];
}

export interface GetPlayQuestionAnswer {
  id: number;
  content: string;
}

// GET ALL QUESTIONS

export type SortFieldType = "id" | "title" | "createdAt" | "updatedAt";
export type OrderType = "ASC" | "DESC";

export interface GetAllQuestionsRequest {
  sortField: SortFieldType;
  keyWord: string;
  order: OrderType;
  size: number;
  page: number;
}

export interface GetAllQuestionsResponse {
  statusCode: number;
  message: string;
  data: GetAllQuestionsData;
}

export interface GetAllQuestionsData {
  total: number;
  result: GetAllQuestionsResult[];
  totalPages: number;
  currentPage: number;
}

export interface GetAllQuestionsResult {
  id: number;
  title: string;
  thumbnail_link: string;
  createdAt: string;
  updatedAt: string;
  answers: GetAllQuestionAnswer[];
}

export interface GetAllQuestionAnswer {
  id: number;
  content: string;
  is_correct: boolean;
  createdAt: string;
  updatedAt: string;
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
  answers: ListQuestionCheckedAnswer[];
  numberSubmitCorrect: number;
  numberSubmitIncorrect: number;
  numberAnswersCorrect: number;
  scoreThisQuestion: number;
}

export interface ListQuestionCheckedAnswer {
  id: number;
  content: string;
  is_correct: boolean;
  is_submit_correct?: boolean;
}

// ADD QUESTION
export interface AddNewQuestionRequest {
  title: string;
  thumbnail_link: string;
}

export interface AddNewQuestionResponse {
  statusCode: number;
  message: string;
  data: {
    title: string;
    id: number;
    createAt: string;
    updateAt: string;
  };
}

// DELETE QUESTION
export interface DeleteQuestionRequest {
  questionId: number;
}

export interface DeleteQuestionResponse {
  statusCode: number;
  message: string;
}
