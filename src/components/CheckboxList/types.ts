import { UseFormRegister } from "react-hook-form";
import { AddQuestionFormType } from "../../views/ManagementScreen/types";

export type CheckboxListProps = {
  register: UseFormRegister<AddQuestionFormType>;
  defaultCorrectAnswers: {
    answer1: boolean;
    answer2: boolean;
    answer3: boolean;
    answer4: boolean;
  };
};
