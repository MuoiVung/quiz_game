export type MangementType = "user" | "question";

export type QuestionRowType = {
  id: number;
  seq: number;
  title: string;
  createdDay: string;
  thumbnail: string;
};

export type AddQuestionFormType = {
  title: string;
  thumbnailLink?: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  answerCorrect: 1 | 2 | 3 | 4;
};

export type QuestionModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
};
