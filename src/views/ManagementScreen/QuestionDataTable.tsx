import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box, IconButton } from "@mui/material";
import { GridCellParams, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";
import { toast } from "react-toastify";
import {
  questionsApiSlice,
  useDeleteQuestionMutation,
  useGetAllQuestionsQuery,
} from "../../api/QuestionsAPI";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";
import COLORS from "../../constants/colors";
import store from "../../store/store";
import DataTable from "./DataTable";
import EditQuestionModal from "./EditQuestionModal";
import QuestionModal from "./QuestionModal";
import {
  EditQuestionFormType,
  QuestionDataTableProps,
  QuestionRowType,
} from "./types";
import { number } from "yup";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const QuestionDataTable = ({
  paginationModel,
  searchKeyWord,
  listOrder,
  sortField,
  setPaginationModel,
  isAddModalOpen,
  onCloseAddModal,
  editModalState,
  onCloseEditModal,
  onOpenEditModal,
  isDeleteModalOpen,
  onCloseDeleteModal,
  onOpenDeleteModal,
}: QuestionDataTableProps) => {
  const {
    data: questionsData,
    isLoading: isGetAllQuestionsLoading,
    isFetching: isGetAllQuestionsFetching,
  } = useGetAllQuestionsQuery({
    page: paginationModel.page + 1,
    size: paginationModel.pageSize,
    keyWord: searchKeyWord,
    order: listOrder,
    sortField,
  });

  const [deleteQuestion, { isLoading: isDeleteQuestionLoading }] =
    useDeleteQuestionMutation();

  const [rowCountState, setRowCountState] = useState(questionsData?.total || 0);

  const [isGetQuestionLoading, setIsGetQuestionLoading] = useState(false);

  const [currentQuestionId, setCurrentQuestionId] = useState<null | number>();

  const [questionFormData, setQuestionFormData] =
    useState<EditQuestionFormType>({
      title: " ",
      thumbnailLink: " ",
      answer1: " ",
      answer2: " ",
      answer3: " ",
      answer4: " ",
      answerCorrect: {
        answer1: false,
        answer2: false,
        answer3: false,
        answer4: false,
      },
    });

  const handleShowDeleteQuestion = useCallback(
    (questionId: number) => {
      onOpenDeleteModal();
      setCurrentQuestionId(questionId);
    },
    [onOpenDeleteModal]
  );

  const handleDeleteQuestion = useCallback(async () => {
    if (!currentQuestionId) {
      return;
    }

    try {
      await deleteQuestion({ questionId: currentQuestionId });
      if (
        questionsData?.currentPage === questionsData?.totalPages &&
        (questionsData?.total || 0) % paginationModel.pageSize === 1
      ) {
        setPaginationModel((prev) => ({ ...prev, page: prev.page - 1 }));
      }
    } catch (error) {
      toast.error("Failed to delete this question. Please try again later.");
    } finally {
      onCloseDeleteModal();
    }
  }, [
    deleteQuestion,
    paginationModel.pageSize,
    questionsData?.currentPage,
    questionsData?.total,
    questionsData?.totalPages,
    setPaginationModel,
    currentQuestionId,
    onCloseDeleteModal,
  ]);

  const handleEditQuestion = useCallback(
    async (questionId: number) => {
      try {
        setIsGetQuestionLoading(true);

        const questionData = await store
          .dispatch(
            questionsApiSlice.endpoints.getQuestion.initiate({ questionId })
          )
          .unwrap();

        const sortedAnswer = [...questionData.data.answers].sort(
          (ans1, ans2) => ans1.id - ans2.id
        );

        const transformedQuestionForm: EditQuestionFormType = {
          title: questionData.data.title,
          thumbnailLink: questionData?.data.thumbnail_link,
          answer1: sortedAnswer[0].content,
          answer2: sortedAnswer[1].content,
          answer3: sortedAnswer[2].content,
          answer4: sortedAnswer[3].content,
          answerCorrect: {
            answer1: sortedAnswer[0].is_correct,
            answer2: sortedAnswer[1].is_correct,
            answer3: sortedAnswer[2].is_correct,
            answer4: sortedAnswer[3].is_correct,
          },
        };

        setQuestionFormData(transformedQuestionForm);
        onOpenEditModal(questionId);
      } catch (error) {
        toast.error(
          "Failed to get question information! Please try again later!"
        );
      } finally {
        setIsGetQuestionLoading(false);
      }
    },
    [onOpenEditModal]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "seq",
        headerName: "Seq",
        minWidth: 100,
      },
      {
        field: "title",
        headerName: "Title",
        minWidth: 150,
        flex: 3,
      },
      {
        field: "createdDay",
        headerName: "Created Day",
        minWidth: 150,
        flex: 2,
      },
      {
        field: "thumbnail",
        headerName: "Thumbnail",
        minWidth: 200,
        flex: 1,
        renderCell: (params: GridCellParams) =>
          params.value ? (
            <img
              src={params.value.toString()}
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
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 150,
        flex: 1,
        renderCell: (params: GridCellParams) => (
          <Box
            sx={{
              display: "flex",
            }}
          >
            <IconButton
              sx={{
                color: COLORS.BLUE,
              }}
              onClick={() => {
                handleEditQuestion(+params.id);
              }}
            >
              <BorderColorOutlinedIcon />
            </IconButton>

            <IconButton
              sx={{
                ml: "8px",
                color: COLORS.RED,
              }}
              onClick={() => {
                handleShowDeleteQuestion(+params.id);
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [handleEditQuestion, handleShowDeleteQuestion]
  );

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

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      questionsData?.total !== undefined
        ? questionsData?.total
        : prevRowCountState
    );
  }, [questionsData?.total]);

  return (
    <Box>
      <DataTable
        columns={columns}
        rows={transformQuestionsData}
        rowCount={rowCountState}
        paginationModel={{
          page: questionsData?.totalPages
            ? questionsData.totalPages <= paginationModel.page
              ? paginationModel.page - 1
              : paginationModel.page
            : paginationModel.page,
          pageSize: paginationModel.pageSize,
        }}
        loading={isGetAllQuestionsLoading || isGetAllQuestionsFetching}
        onPaginationModelChange={setPaginationModel}
      />
      {/* START:  Modal */}
      {isAddModalOpen && (
        <QuestionModal isOpen={isAddModalOpen} onCloseModal={onCloseAddModal} />
      )}
      {editModalState.open && (
        <EditQuestionModal
          isOpen={editModalState.open}
          questionId={editModalState.id}
          onCloseModal={onCloseEditModal}
          questionFormData={questionFormData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isLoading={isDeleteQuestionLoading}
          title="Delete Question"
          onCloseModal={onCloseDeleteModal}
          onConfirmDelete={handleDeleteQuestion}
          open={isDeleteModalOpen}
        />
      )}
      {/* END: Modal */}
      {isGetQuestionLoading && (
        <CircularSpinner isLoading={isGetQuestionLoading} />
      )}
    </Box>
  );
};

export default QuestionDataTable;
