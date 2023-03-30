// GET PLAY QUESTIONS
export interface GetPlayQuestionsRequest {
  total: number;
}

export interface GetPlayQuestionsResponse {
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  result: Result[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface Result {
  id: number;
  title: string;
  thumbnail_link: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  content: string;
}
