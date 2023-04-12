import { Grid } from "@mui/material";
import CheckboxItem from "../CheckboxItem/CheckboxItem";
import { CheckboxListProps } from "./types";

const CheckboxList = ({
  register,
  defaultCorrectAnswers,
}: CheckboxListProps) => {
  return (
    <Grid container>
      <CheckboxItem
        label="Answer 1"
        extraProps={{ ...register("answerCorrect.answer1") }}
        defaultChecked={defaultCorrectAnswers.answer1}
      />
      <CheckboxItem
        label="Answer 2"
        extraProps={{ ...register("answerCorrect.answer2") }}
        defaultChecked={defaultCorrectAnswers.answer2}
      />
      <CheckboxItem
        label="Answer 3"
        extraProps={{ ...register("answerCorrect.answer3") }}
        defaultChecked={defaultCorrectAnswers.answer3}
      />
      <CheckboxItem
        label="Answer 4"
        extraProps={{ ...register("answerCorrect.answer4") }}
        defaultChecked={defaultCorrectAnswers.answer4}
      />
    </Grid>
  );
};

export default CheckboxList;
