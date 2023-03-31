// GET PLAY QUESTIONS
export interface GetPlayQuestionsRequest {
  total: string;
}

export interface GetPlayQuestionsResponse {
  statusCode: number;
  message: string;
  data: Data[];
}

export interface Data {
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
