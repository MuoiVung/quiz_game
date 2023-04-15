import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { EditQuestionFormType, EditQuestionModalProps } from "./types";

import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import { useUpdateAnswerMutation } from "../../api/AnswersAPI";
import {
  useGetQuestionQuery,
  useUpdateQuestionMutation,
  useUploadThumbnailMutation,
} from "../../api/QuestionsAPI";
import CheckboxList from "../../components/CheckboxList/CheckboxList";
import FormModal from "../../components/FormModal";
import FormModalButton from "../../components/FormModalButton";
import Thumbnail from "../../components/Thumbnail";
import COLORS from "../../constants/colors";

const defaultUrlModal = {
  url: "",
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

const urlModalSchema = yup.object({
  url: yup.string().url("URL is invalid").required("Url is required"),
});

const EditQuestionModal = ({
  isOpen,
  onCloseModal,
  questionId,
  questionFormData,
}: EditQuestionModalProps) => {
  const { data: questionData } = useGetQuestionQuery({ questionId });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditQuestionFormType>({
    resolver: yupResolver(questionValidateSchema),
    defaultValues: questionFormData,
  });

  const {
    register: urlModalRegister,
    handleSubmit: handleSubmitUrlModal,
    reset: resetUrlModal,
    formState: { errors: urlModalError },
  } = useForm({
    defaultValues: defaultUrlModal,
    resolver: yupResolver(urlModalSchema),
  });

  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setThumbnailUrl(questionData?.data.thumbnail_link || "");
  }, [questionData?.data.thumbnail_link]);

  const [updateQuestion, { isLoading: isUpdateQuestionLoading }] =
    useUpdateQuestionMutation();

  const [updateAnswer, { isLoading: isUpdateAnswerLoading }] =
    useUpdateAnswerMutation();

  const [uploadThumbnail, { isLoading: isUpdateThumbnailLoading }] =
    useUploadThumbnailMutation();

  const handleEditQuestion = async (formData: EditQuestionFormType) => {
    let answersData = questionData?.data.answers;

    const answerCorrect = formData.answerCorrect;

    try {
      if (
        formData.title !== questionFormData.title ||
        formData.thumbnailLink !== questionFormData.thumbnailLink ||
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
        (!answer1.is_correct && answerCorrect.answer1) ||
        (answer1.is_correct && !answerCorrect.answer1)
      ) {
        updateAnswerPromises.push(
          updateAnswer({
            content: formData.answer1,
            is_correct: answerCorrect.answer1,
            answerId: answer1.id,
            questionId,
          }).unwrap()
        );
      }

      if (
        formData.answer2 !== answer2.content ||
        (!answer2.is_correct && answerCorrect.answer2) ||
        (answer2.is_correct && !answerCorrect.answer2)
      ) {
        updateAnswerPromises.push(
          updateAnswer({
            content: formData.answer2,
            is_correct: answerCorrect.answer2,
            answerId: answer2.id,
            questionId,
          }).unwrap()
        );
      }

      if (
        formData.answer3 !== answer3.content ||
        (!answer3.is_correct && answerCorrect.answer3) ||
        (answer3.is_correct && !answerCorrect.answer3)
      ) {
        updateAnswerPromises.push(
          updateAnswer({
            content: formData.answer3,
            is_correct: answerCorrect.answer3,
            answerId: answer3.id,
            questionId,
          }).unwrap()
        );
      }

      if (
        formData.answer4 !== answer4.content ||
        (!answer4.is_correct && answerCorrect.answer4) ||
        (answer4.is_correct && !answerCorrect.answer4)
      ) {
        updateAnswerPromises.push(
          updateAnswer({
            content: formData.answer4,
            is_correct: answerCorrect.answer4,
            answerId: answer4.id,
            questionId,
          }).unwrap()
        );
      }

      await Promise.all(updateAnswerPromises);

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

  const handleCloseUrlModal = () => {
    setIsUrlModalOpen(false);
  };

  const handleOpenUrlModal = () => {
    setIsUrlModalOpen(true);
  };

  const handleSetNewThumbnailUrl = ({ url }: { url: string }) => {
    setValue("thumbnailLink", url);
    setThumbnailUrl(url);
    resetUrlModal();
    setIsUrlModalOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadImageFile = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = event.target;

    if (!files || !files[0]) {
      return;
    }

    const formData = new FormData();
    formData.append("thumbnail", files[0]);

    try {
      const response = await uploadThumbnail(formData).unwrap();

      setValue("thumbnailLink", response.data);
      setThumbnailUrl(response.data);
    } catch (error) {
      toast.error("Failed to upload thumbnail");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <FormModal
      onClose={handleCloseModal}
      open={isOpen}
      title="Edit Question"
      isLoading={
        isUpdateQuestionLoading ||
        isUpdateAnswerLoading ||
        isUpdateThumbnailLoading
      }
    >
      {/* START: ADD QUESTION FORM */}
      <Box
        component="form"
        onSubmit={handleSubmit(handleEditQuestion)}
        pt="16px"
      >
        <Grid
          container
          sx={{ maxHeight: "500px", overflowY: "auto" }}
          spacing={2}
        >
          <Grid item xs={12}>
            <TextField
              {...register("title")}
              required
              error={errors.title ? true : false}
              helperText={errors.title?.message}
              name="title"
              label="Title"
              autoFocus
              fullWidth
              autoComplete="true"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("answer1")}
              required
              error={errors.answer1 ? true : false}
              helperText={errors.answer1?.message}
              name="answer1"
              label="Answer 1"
              autoFocus
              fullWidth
              autoComplete="true"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("answer2")}
              required
              error={errors.answer2 ? true : false}
              helperText={errors.answer2?.message}
              name="answer2"
              label="Answer 2"
              autoFocus
              fullWidth
              autoComplete="true"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("answer3")}
              required
              error={errors.answer3 ? true : false}
              helperText={errors.answer3?.message}
              name="answer3"
              label="Answer 3"
              autoFocus
              fullWidth
              autoComplete="true"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              {...register("answer4")}
              required
              error={errors.answer4 ? true : false}
              helperText={errors.answer4?.message}
              name="answer4"
              label="Answer 4"
              autoFocus
              fullWidth
              autoComplete="true"
              sx={{
                mb: "24px",
              }}
            />
          </Grid>
        </Grid>
        <FormLabel
          sx={{
            color: COLORS.BLACK,
          }}
        >
          Correct Answer
        </FormLabel>

        <CheckboxList
          register={register}
          defaultCorrectAnswers={questionFormData.answerCorrect}
        />

        <Typography sx={{ mt: "20px", mb: "16px" }}>Thumbnail</Typography>

        <Box display="flex" justifyContent="center">
          <Thumbnail src={thumbnailUrl} />
        </Box>

        <Stack spacing="2px" justifyContent="center" mt={2}>
          <Button component="label">
            Upload image from your computer
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={handleUploadImageFile}
              ref={fileInputRef}
            />
          </Button>
          <Button onClick={handleOpenUrlModal}>Add image URL</Button>
        </Stack>

        <FormModalButton
          loading={isUpdateQuestionLoading || isUpdateAnswerLoading}
          onCloseModal={handleCloseModal}
        />
      </Box>
      {/* END: ADD QUESTION FORM */}
      <FormModal open={isUrlModalOpen} onClose={handleCloseUrlModal}>
        <Typography variant="h5" fontFamily="Poppins">
          Add image URL
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmitUrlModal(handleSetNewThumbnailUrl)}
        >
          <TextField
            {...urlModalRegister("url")}
            name="url"
            label="Thumbnail Link"
            autoFocus
            fullWidth
            margin="normal"
            autoComplete="true"
            required
            error={urlModalError.url ? true : false}
            helperText={urlModalError.url?.message}
          />
          <FormModalButton onCloseModal={handleCloseUrlModal} loading={false} />
        </Box>
      </FormModal>
    </FormModal>
  );
};

export default memo(EditQuestionModal);
