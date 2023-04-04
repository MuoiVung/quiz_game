export interface AddNewAnswerRequest {
  content: string;
  is_correct: boolean;
  questionId: number;
}

export interface AddNewAnswerResponse {
  statusCode: number;
  message: string;
  data: {
    id: number;
    content: string;
    is_correct: boolean;
    question: {
      thumbnail_link: string;
      id: number;
      title: string;
    };
  };
}
