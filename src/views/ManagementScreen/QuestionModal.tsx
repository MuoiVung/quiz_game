import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Box,
  Button,
  FormLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AddQuestionFormType, BasicModalProps } from "./types";

import { LoadingButton } from "@mui/lab";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAddNewAnswerMutation } from "../../api/AnswersAPI";
import {
  useAddNewQuestionMutation,
  useUploadThumbnailMutation,
} from "../../api/QuestionsAPI";
import CheckboxList from "../../components/CheckboxList";
import CustomModal from "../../components/CustomModal";
import COLORS from "../../constants/colors";

const defaultUrlModal = {
  url: "",
};

const defaultAddQuestion: AddQuestionFormType = {
  title: "",
  thumbnailLink: "",
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  answerCorrect: {
    answer1: false,
    answer2: false,
    answer3: false,
    answer4: false,
  },
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

const QuestionModal = ({ isOpen, onCloseModal }: BasicModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm<AddQuestionFormType>({
    resolver: yupResolver(questionValidateSchema),
    defaultValues: defaultAddQuestion,
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

  const [addNewQuestion, { isLoading: isAddNewQuestionLoading }] =
    useAddNewQuestionMutation();

  const [addNewAnswers, { isLoading: isAddNewAnswerLoading }] =
    useAddNewAnswerMutation();

  const [uploadThumbnail] = useUploadThumbnailMutation();

  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddQuestion = async (data: AddQuestionFormType) => {
    console.log("data: ", data);
    try {
      const {
        data: { id: questionId },
      } = await addNewQuestion({
        title: data.title,
        thumbnail_link: data.thumbnailLink || "",
      }).unwrap();
      const answers = [
        { content: data.answer1, is_correct: data.answerCorrect.answer1 },
        { content: data.answer2, is_correct: data.answerCorrect.answer2 },
        { content: data.answer3, is_correct: data.answerCorrect.answer3 },
        { content: data.answer4, is_correct: data.answerCorrect.answer4 },
      ];
      const promises = answers.map((answer) =>
        addNewAnswers({ ...answer, questionId })
      );
      await Promise.all(promises);
      toast.success("Add new question successuflly!");
      reset();
      onCloseModal();
    } catch (error) {
      toast.error("Failed to add new question!", {
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
      const response = await toast.promise(
        () => uploadThumbnail(formData).unwrap(),
        {
          pending: "Uploading...",
          success: "Uploaded thumbnail successfully",
          error: "Failed to upload thumbnail",
        }
      );

      setValue("thumbnailLink", response.data);
      setThumbnailUrl(response.data);
    } catch (error) {
      console.error("Faild to upload thumbnail");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <CustomModal onClose={handleCloseModal} open={isOpen}>
      <Typography
        variant="h4"
        fontFamily="poppins"
        sx={{
          textAlign: "center",
          mb: "24px",
        }}
      >
        Add Question
      </Typography>
      {/* START: ADD QUESTION FORM */}
      <Box component="form" onSubmit={handleSubmit(handleAddQuestion)}>
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

        {/* Answer Checkbox List */}
        <CheckboxList
          register={register}
          defaultCorrectAnswers={defaultAddQuestion.answerCorrect}
        />

        <Typography sx={{ mt: "20px", mb: "16px" }}>Thumbnail</Typography>

        <Box display="flex" justifyContent="center">
          <Avatar
            alt="thumbnail"
            sx={{
              width: "50px",
              height: "50px",
            }}
            src={thumbnailUrl}
          />
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

        {/* Buttons */}
        <Box display="flex" justifyContent="flex-end" my="16px">
          <LoadingButton
            loading={isAddNewQuestionLoading || isAddNewAnswerLoading}
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
      <CustomModal open={isUrlModalOpen} onClose={handleCloseUrlModal}>
        <Typography variant="h5" fontFamily="Poppins">
          Add image URL
        </Typography>
        <Box
          component="form"
          sx={{ minWidth: "400px" }}
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
          <Box display="flex" justifyContent="flex-end" my="16px">
            <Button
              type="submit"
              variant="contained"
              sx={{ color: COLORS.WHITE, mr: "12px" }}
            >
              Save
            </Button>
            <Button
              color="error"
              variant="contained"
              onClick={handleCloseUrlModal}
              sx={{ color: COLORS.WHITE }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </CustomModal>
  );
};

export default QuestionModal;
