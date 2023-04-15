export type ReviewCardProps = {
  seq: number;
  question: string;
  answers: (AnswerItemProps & { id: number })[];
  point: number;
  isCorrect: boolean;
};

export type AnswerItemProps = {
  status: "fail" | "true" | "unselected" | "true-unselected";
  content: string;
};
