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
import { AddQuestionFormType, EditQuestionModalProps } from "./types";

import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import {
  useAddNewAnswerMutation,
  useUpdateAnswerMutation,
} from "../../api/AnswersAPI";
import {
  useAddNewQuestionMutation,
  useGetQuestionQuery,
  useUpdateQuestionMutation,
} from "../../api/QuestionsAPI";
import CustomModal from "../../components/CustomModal";
import LoadingScreen from "../../components/LoadingScreen";
import COLORS from "../../constants/colors";
import { UpdateAnswerRequest } from "../../api/AnswersAPI/types";

const defaultAddQuestion: AddQuestionFormType = {
  title: "2",
  thumbnailLink: "",
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
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
  //   const [questionDefaultValues, setQuestionDefaultValues] =
  //     useState<AddQuestionFormType | null>(null);

  const {
    data: questionData,
    isLoading,
    isFetching,
  } = useGetQuestionQuery({ questionId });

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

  useEffect(() => {
    if (questionData) {
      const { data } = questionData;
      const defaultValues = {
        title: data.title,
        thumbnailLink: data.thumbnail_link,
        answer1: data.answers[0]?.content || "",
        answer2: data.answers[1]?.content || "",
        answer3: data.answers[2]?.content || "",
        answer4: data.answers[3]?.content || "",
        answerCorrect:
          data.answers.findIndex((answer) => answer.is_correct) + 1,
      };

      reset(defaultValues);
    }
  }, [questionData, reset]);

  const [updateQuestion, { isLoading: isUpdateQuestionLoading }] =
    useUpdateQuestionMutation();

  const [updateAnswer, { isLoading: isUpdateAnswerLoading }] =
    useUpdateAnswerMutation();

  const handleEditQuestion = async (formData: AddQuestionFormType) => {
    try {
      const {
        data: { answers: answersData },
      } = await updateQuestion({
        title: formData.title,
        thumbnail_link: formData.thumbnailLink || "",
        questionId,
      }).unwrap();

      const answers = [
        {
          content: formData.answer1,
          is_correct: 1 === +formData.answerCorrect,
          answerId: answersData[0].id,
        },
        {
          content: formData.answer2,
          is_correct: 2 === +formData.answerCorrect,
          answerId: answersData[1].id,
        },
        {
          content: formData.answer3,
          is_correct: 3 === +formData.answerCorrect,
          answerId: answersData[2].id,
        },
        {
          content: formData.answer4,
          is_correct: 4 === +formData.answerCorrect,
          answerId: answersData[3].id,
        },
      ];

      const promises = answers.map((answer) =>
        updateAnswer({ ...answer, questionId }).unwrap()
      );

      await Promise.all(promises);
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

  if (isLoading || isFetching) {
    return <LoadingScreen />;
  }

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
