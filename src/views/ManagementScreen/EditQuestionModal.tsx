import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  AddQuestionFormType,
  CORRECT_ANSWER,
  EditQuestionModalProps,
} from "./types";

import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useUpdateAnswerMutation } from "../../api/AnswersAPI";
import {
  useGetQuestionQuery,
  useUpdateQuestionMutation,
} from "../../api/QuestionsAPI";
import CustomModal from "../../components/CustomModal";
import COLORS from "../../constants/colors";

const defaultAddQuestion: AddQuestionFormType = {
  title: " ",
  thumbnailLink: " ",
  answer1: " ",
  answer2: " ",
  answer3: " ",
  answer4: " ",
  answerCorrect: 1,
};

const questionValidateSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    answer1: yup.string().required("Answer 1 is required"),
    answer2: yup.string().required("Answer 1 is required"),
    answer3: yup.string().required("Answer 1 is required"),
    answer4: yup.string().required("Answer 1 is required"),
  })
  .required();

const EditQuestionModal = ({
  isOpen,
  onCloseModal,
  questionId,
}: EditQuestionModalProps) => {
  const { data: questionData } = useGetQuestionQuery({ questionId });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<AddQuestionFormType>({
    resolver: yupResolver(questionValidateSchema),
    defaultValues: defaultAddQuestion,
  });

  const [defaultEditQuestionState, setDefaultEditQuestionState] =
    useState(defaultAddQuestion);

  useEffect(() => {
    if (questionData) {
      const { data } = questionData;

      const sortedAnswer = [...data.answers].sort(
        (ans1, ans2) => ans1.id - ans2.id
      );

      const defaultValues = {
        title: data.title,
        thumbnailLink: data.thumbnail_link,
        answer1: sortedAnswer[0]?.content || "",
        answer2: sortedAnswer[1]?.content || "",
        answer3: sortedAnswer[2]?.content || "",
        answer4: sortedAnswer[3]?.content || "",
        answerCorrect:
          sortedAnswer.findIndex((answer) => answer.is_correct) + 1,
      };
      setDefaultEditQuestionState(defaultValues);
      reset(defaultValues);
    }
  }, [questionData, reset]);

  const [updateQuestion, { isLoading: isUpdateQuestionLoading }] =
    useUpdateQuestionMutation();

  const [updateAnswer, { isLoading: isUpdateAnswerLoading }] =
    useUpdateAnswerMutation();

  const handleEditQuestion = async (formData: AddQuestionFormType) => {
    let answersData = questionData?.data.answers;

    const answerCorrect = +formData.answerCorrect;

    try {
      if (
        formData.title !== defaultEditQuestionState.title ||
        formData.thumbnailLink !== defaultEditQuestionState.thumbnailLink ||
        !answersData
      ) {
        const {
          data: { answers: answersResponse },
        } = await updateQuestion({
          title: formData.title,
          thumbnail_link: formData.thumbnailLink || "",
          questionId,
        }).unwrap();

        answersData = [...answersResponse];
      }

      const [answer1, answer2, answer3, answer4] = [...answersData].sort(
        (ans1, ans2) => ans1.id - ans2.id
      );

      const updateAnswerPromises = [];

      if (
        formData.answer1 !== answer1.content ||
        (!answer1.is_correct && answerCorrect === CORRECT_ANSWER.ANSWER_1) ||
        (answer1.is_correct && answerCorrect !== CORRECT_ANSWER.ANSWER_1)
      ) {
        updateAnswerPromises.push(
          updateAnswer({
            content: formData.answer1,
            is_correct: CORRECT_ANSWER.ANSWER_1 === answerCorrect,
            answerId: answer1.id,
            questionId,
          }).unwrap()
        );
      }

      if (
        formData.answer2 !== answer2.content ||
        (!answer2.is_correct && answerCorrect === CORRECT_ANSWER.ANSWER_2) ||
        (answer2.is_correct && answerCorrect !== CORRECT_ANSWER.ANSWER_2)
      ) {
        updateAnswerPromises.push(
          updateAnswer({
            content: formData.answer2,
            is_correct: CORRECT_ANSWER.ANSWER_2 === answerCorrect,
            answerId: answer2.id,
            questionId,
          }).unwrap()
        );
      }

      if (
        formData.answer3 !== answer3.content ||
        (!answer3.is_correct && answerCorrect === CORRECT_ANSWER.ANSWER_3) ||
        (answer3.is_correct && answerCorrect !== CORRECT_ANSWER.ANSWER_3)
      ) {
        updateAnswerPromises.push(
          updateAnswer({
            content: formData.answer3,
            is_correct: CORRECT_ANSWER.ANSWER_3 === answerCorrect,
            answerId: answer3.id,
            questionId,
          }).unwrap()
        );
      }

      if (
        formData.answer4 !== answer4.content ||
        (!answer4.is_correct && answerCorrect === CORRECT_ANSWER.ANSWER_4) ||
        (answer4.is_correct && answerCorrect !== CORRECT_ANSWER.ANSWER_4)
      ) {
        updateAnswerPromises.push(
          updateAnswer({
            content: formData.answer4,
            is_correct: CORRECT_ANSWER.ANSWER_4 === answerCorrect,
            answerId: answer4.id,
            questionId,
          }).unwrap()
        );
      }

      await Promise.all(updateAnswerPromises);

      toast.success("Edit question successuflly!");
      reset();
      onCloseModal();
    } catch (error) {
      toast.error("Failed to edit question!", {
        position: "top-center",
      });
    }
  };

  const handleCloseModal = () => {
    reset();
    onCloseModal();
  };

  return (
    <CustomModal onClose={handleCloseModal} open={isOpen}>
      <Typography
        variant="h4"
        fontFamily="poppins"
        sx={{
          textAlign: "center",
          mb: "12px",
        }}
      >
        Edit Question
      </Typography>
      {/* START: ADD QUESTION FORM */}
      <Box component="form" onSubmit={handleSubmit(handleEditQuestion)}>
        <TextField
          {...register("title")}
          required
          error={errors.title ? true : false}
          helperText={errors.title?.message}
          name="title"
          label="Title"
          autoFocus
          fullWidth
          margin="normal"
          autoComplete="true"
        />
        <TextField
          {...register("thumbnailLink")}
          name="thumbnailLink"
          label="Thumbnail Link"
          autoFocus
          fullWidth
          margin="normal"
          autoComplete="true"
        />
        <TextField
          {...register("answer1")}
          required
          error={errors.answer1 ? true : false}
          helperText={errors.answer1?.message}
          name="answer1"
          label="Answer 1"
          autoFocus
          fullWidth
          margin="normal"
          autoComplete="true"
        />
        <TextField
          {...register("answer2")}
          required
          error={errors.answer2 ? true : false}
          helperText={errors.answer2?.message}
          name="answer2"
          label="Answer 2"
          autoFocus
          fullWidth
          margin="normal"
          autoComplete="true"
        />
        <TextField
          {...register("answer3")}
          required
          error={errors.answer3 ? true : false}
          helperText={errors.answer3?.message}
          name="answer3"
          label="Answer 3"
          autoFocus
          fullWidth
          margin="normal"
          autoComplete="true"
        />
        <TextField
          {...register("answer4")}
          required
          error={errors.answer4 ? true : false}
          helperText={errors.answer4?.message}
          name="answer4"
          label="Answer 4"
          autoFocus
          fullWidth
          margin="normal"
          autoComplete="true"
          sx={{
            mb: "24px",
          }}
        />

        <FormLabel
          sx={{
            color: COLORS.BLACK,
          }}
        >
          Correct Answer
        </FormLabel>
        <Controller
          control={control}
          name="answerCorrect"
          defaultValue={1}
          render={({ field }) => (
            <RadioGroup row value={field.value} onChange={field.onChange}>
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Answer 1"
              />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Answer 2"
              />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label="Answer 3"
              />
              <FormControlLabel
                value={4}
                control={<Radio />}
                label="Answer 4"
              />
            </RadioGroup>
          )}
        />
        {/* Buttons */}
        <Box display="flex" justifyContent="flex-end" my="16px">
          <LoadingButton
            loading={isUpdateQuestionLoading || isUpdateAnswerLoading}
            type="submit"
            variant="contained"
            sx={{ color: COLORS.WHITE, mr: "12px" }}
            disabled={!isValid}
          >
            Save
          </LoadingButton>
          <Button
            color="error"
            variant="contained"
            onClick={handleCloseModal}
            sx={{ color: COLORS.WHITE }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      {/* END: ADD QUESTION FORM */}
    </CustomModal>
  );
};

export default EditQuestionModal;
