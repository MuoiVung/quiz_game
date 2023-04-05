// ADD NEW ANSWER
export interface AddNewAnswerRequest {
  content: string;
  is_correct: boolean;
  questionId: number;
}

export interface AddNewAnswerResponse {
  statusCode: number;
  message: string;
  data: AnswerData;
}

// UPDATE ANSWER

export interface UpdateAnswerRequest {
  answerId: number;
  is_correct: boolean;
  content: string;
  questionId: number;
}

export interface UpdateAnswerResponse {
  statusCode: number;
  message: string;
  data: AnswerData;
}

export interface AnswerData {
  id: number;
  content: string;
  is_correct: boolean;
  question: {
    thumbnail_link: string;
    id: number;
    title: string;
  };
}
