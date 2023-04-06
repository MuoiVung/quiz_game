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
  answerCorrect: number;
};

export type QuestionModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
};

export type EditQuestionModalProps = {
  isOpen: boolean;
  onCloseModal: () => void;
  questionId: number;
};

export type QuestionModalType = "edit" | "add";

export enum CORRECT_ANSWER {
  ANSWER_1 = 1,
  ANSWER_2,
  ANSWER_3,
  ANSWER_4,
}
