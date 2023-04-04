import { yupResolver } from "@hookform/resolvers/yup";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import * as yup from "yup";

import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useAddNewQuestionMutation,
  useGetAllQuestionsQuery,
} from "../../api/QuestionsAPI";
import CustomModal from "../../components/CustomModal";
import COLORS from "../../constants/colors";
import { AddQuestionFormType, QuestionRowType } from "./types";
import { useAddNewAnswerMutation } from "../../api/AnswersAPI";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaderTitle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
}));

const columns: GridColDef[] = [
  {
    field: "seq",
    headerName: "Seq",
    minWidth: 100,
  },
  {
    field: "title",
    headerName: "Title",
    minWidth: 150,
    flex: 1,
  },
  { field: "createdDay", headerName: "Created Day", minWidth: 150, flex: 0.5 },
  {
    field: "thumbnail",
    headerName: "Thumbnail",
    minWidth: 200,
    flex: 0.5,
    renderCell: (params) =>
      params.value ? (
        <img
          src={params.value}
          alt="thumbnail"
          style={{
            width: 60,
            height: 60,
            padding: "12px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ) : (
        <p>No thumbnail</p>
      ),
  },
];

const defaultAddQuestion: AddQuestionFormType = {
  title: "",
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

const ManagementScreen = () => {
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
  const [type, setType] = useState("question");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);

  const {
    data: questionsData,
    isLoading: isGetAllQuestionsLoading,
    isFetching: isGetAllQuestionsFetching,
  } = useGetAllQuestionsQuery({
    page: paginationModel.page + 1,
    size: paginationModel.pageSize,
  });

  const [addNewQuestion, { isLoading: isAddNewQuestionLoading }] =
    useAddNewQuestionMutation();
  const [addNewAnswers, { isLoading: isAddNewAnswerLoading }] =
    useAddNewAnswerMutation();

  const [rowCountState, setRowCountState] = useState(questionsData?.total || 0);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      questionsData?.total !== undefined
        ? questionsData?.total
        : prevRowCountState
    );
  }, [questionsData?.total]);

  const transformQuestionsData: GridRowsProp<QuestionRowType> = useMemo(() => {
    if (!questionsData?.result) {
      return [];
    }

    return questionsData?.result.map((question, index) => ({
      id: question.id,
      seq: index + paginationModel.page * paginationModel.pageSize + 1,
      title: question.title,
      createdDay: dayjs(question.createdAt).format("DD/MM/YYYY"),
      thumbnail: question.thumbnail_link || "",
    }));
  }, [questionsData?.result, paginationModel.page, paginationModel.pageSize]);

  const handleSelectType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleCloseAddQuestionModal = () => {
    reset();
    setIsAddQuestionModalOpen(false);
  };

  const handleOpenAddQuestionModal = () => {
    setIsAddQuestionModalOpen(true);
  };

  const handleAddQuestion = async (data: AddQuestionFormType) => {
    try {
      const {
        data: { id: questionId },
      } = await addNewQuestion({
        title: data.title,
        thumbnail_link: data.thumbnailLink || "",
      }).unwrap();

      const answers = [
        { content: data.answer1, is_correct: 1 === +data.answerCorrect },
        { content: data.answer2, is_correct: 2 === +data.answerCorrect },
        { content: data.answer3, is_correct: 3 === +data.answerCorrect },
        { content: data.answer4, is_correct: 4 === +data.answerCorrect },
      ];

      const promises = answers.map((answer) =>
        addNewAnswers({ ...answer, questionId })
      );

      await Promise.all(promises);
      toast.success("Add new question successuflly!");
      reset();
      setIsAddQuestionModalOpen(false);
    } catch (error) {
      toast.error("Failed to add new question!", {
        position: "top-center",
      });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          backgroundColor: COLORS.WHITE,
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Start: Questions/Users */}
        <FormControl
          sx={{ m: 1, minWidth: 120, backgroundColor: COLORS.WHITE }}
        >
          <Select value={type} onChange={handleSelectType} displayEmpty>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="question">Question</MenuItem>
          </Select>
        </FormControl>
        {/* End: Questions/Users */}

        {/* Search */}
        <TextField
          label="Search"
          sx={{
            minWidth: 300,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Search */}
        {/* Start: Search - Add new Question/User */}
        <IconButton size="large" onClick={handleOpenAddQuestionModal}>
          <AddCircleIcon sx={{ fontSize: 48, color: COLORS.YELLOW }} />
        </IconButton>
        {/* End: Search - Add new Question/User */}
      </Box>
      {/* Table */}
      <Box sx={{ height: 200, mt: "24px" }}>
        <StyledDataGrid
          autoHeight
          columns={columns}
          rows={transformQuestionsData}
          rowCount={rowCountState}
          pageSizeOptions={[5]}
          paginationModel={paginationModel}
          loading={isGetAllQuestionsLoading || isGetAllQuestionsFetching}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
        />
      </Box>
      {/* Table */}
      {/* START:  Modal */}
      <CustomModal
        onClose={handleCloseAddQuestionModal}
        open={isAddQuestionModalOpen}
      >
        <Typography
          variant="h4"
          fontFamily="poppins"
          sx={{
            textAlign: "center",
            mb: "12px",
          }}
        >
          Add Question
        </Typography>
        {/* START: ADD QUESTION FORM */}
        <Box component="form" onSubmit={handleSubmit(handleAddQuestion)}>
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
              onClick={handleCloseAddQuestionModal}
              sx={{ color: COLORS.WHITE }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
        {/* END: ADD QUESTION FORM */}
      </CustomModal>
      {/* END: Modal */}
    </Box>
  );
};

export default ManagementScreen;
