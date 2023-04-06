import { GridCellParams, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, IconButton } from "@mui/material";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import DataTable from "./DataTable";
import COLORS from "../../constants/colors";
import {
  useDeleteQuestionMutation,
  useGetAllQuestionsQuery,
} from "../../api/QuestionsAPI";
import { QuestionDataTableProps, QuestionRowType } from "./types";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import EditQuestionModal from "./EditQuestionModal";
import QuestionModal from "./QuestionModal";

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

  const [deleteQuestion] = useDeleteQuestionMutation();

  const [rowCountState, setRowCountState] = useState(questionsData?.total || 0);

  const handleDeleteQuestion = useCallback(
    async (questionId: number) => {
      try {
        await deleteQuestion({ questionId });
        if (
          questionsData?.currentPage === questionsData?.totalPages &&
          (questionsData?.total || 0) % paginationModel.pageSize === 1
        ) {
          setPaginationModel((prev) => ({ ...prev, page: prev.page - 1 }));
        }

        toast.success("Delete the question successfully.");
      } catch (error) {
        toast.error("Failed to delete this question. Please try again later.");
      }
    },
    [
      deleteQuestion,
      paginationModel.pageSize,
      questionsData?.currentPage,
      questionsData?.total,
      questionsData?.totalPages,
      setPaginationModel,
    ]
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
                onOpenEditModal(+params.id);
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
                handleDeleteQuestion(+params.id);
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [handleDeleteQuestion, onOpenEditModal]
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
        />
      )}
      {/* END: Modal */}
    </Box>
  );
};

export default QuestionDataTable;
