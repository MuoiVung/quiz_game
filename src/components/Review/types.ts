import { ReactNode } from "react";
import { SubmitQuestionsResponse } from "../../api/QuestionsAPI/types";

export type ReviewProps = {
  result: SubmitQuestionsResponse;
};

export type InfoCardProps = {
  title: string;
  content: string;
  icon: ReactNode;
  color: string;
};
