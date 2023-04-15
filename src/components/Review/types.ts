import { ReactNode } from "react";
import { ListQuestionChecked } from "../../api/QuestionsAPI/types";

export type ReviewProps = {
  result: ListQuestionChecked[];
};

export type InfoCardProps = {
  title: string;
  content: string;
  icon: ReactNode;
  color: string;
};

export type ReviewQuestionType = {
  id: number;
  question: string;
  point: number;
  isCorrect: boolean;
  answers: ReviewAnswer[];
};

export type ReviewAnswer = {
  status: "fail" | "true" | "unselected" | "true-unselected";
  content: string;
  id: number;
};
