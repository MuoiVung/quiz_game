import AddCircleIcon from "@mui/icons-material/AddCircle";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
} from "@mui/material";
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowsProp,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { debounce } from "lodash";

import {
  useDeleteQuestionMutation,
  useGetAllQuestionsQuery,
} from "../../api/QuestionsAPI";
import COLORS from "../../constants/colors";
import EditQuestionModal from "./EditQuestionModal";
import QuestionModal from "./QuestionModal";
import { QuestionRowType } from "./types";
import { OrderType, SortFieldType } from "../../api/QuestionsAPI/types";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-columnHeaderTitle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
}));

const ManagementScreen = () => {
  const [type, setType] = useState("question");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);
  const [editQuestionModalState, setEditQuestionModalState] = useState({
    open: false,
    questionId: 0,
  });
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [listOrder, setListOrder] = useState<OrderType>("ASC");
  const [sortField, setSortField] = useState<SortFieldType>("id");

  const {
    data: questionsData,
    isLoading: isGetAllQuestionsLoading,
    isFetching: isGetAllQuestionsFetching,
    refetch: getAllQuestionsRefetch,
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
      questionsData?.currentPage,
      questionsData?.totalPages,
      questionsData?.total,
      paginationModel.pageSize,
    ]
  );

  const handleEditQuestion = useCallback((questionId: number) => {
    setEditQuestionModalState({
      open: true,
      questionId,
    });
  }, []);

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
                handleDeleteQuestion(+params.id);
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [handleDeleteQuestion, handleEditQuestion]
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

  const handleSelectType = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleOpenAddQuestionModal = () => {
    setIsAddQuestionModalOpen(true);
  };

  const handleCloseAddQuestionModal = () => {
    setIsAddQuestionModalOpen(false);
  };

  const handleCloseEditQuestionModal = () => {
    setEditQuestionModalState((prevState) => ({ ...prevState, open: false }));
  };

  const handleSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyWord(event.target.value);
  }, 500);

  const handleSelectOrder = (event: SelectChangeEvent<OrderType>) => {
    setListOrder(event.target.value as OrderType);
  };

  const handleSort = (event: SelectChangeEvent<SortFieldType>) => {
    setSortField(event.target.value as SortFieldType);
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
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {/* Search */}
        {/* Start: Order */}
        <FormControl
          sx={{ m: 1, minWidth: 120, backgroundColor: COLORS.WHITE }}
        >
          <Select value={listOrder} onChange={handleSelectOrder}>
            <MenuItem value="ASC">ASC</MenuItem>
            <MenuItem value="DESC">DESC</MenuItem>
          </Select>
        </FormControl>
        {/* End: Order */}
        {/* Start: Sort */}
        <FormControl
          sx={{ m: 1, minWidth: 120, backgroundColor: COLORS.WHITE }}
        >
          <Select value={sortField} onChange={handleSort}>
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="createdAt">Created At</MenuItem>
            <MenuItem value="updatedAt">Updated At</MenuItem>
          </Select>
        </FormControl>
        {/* End: Sort */}
        {/* Start: Search - Add new Question/User */}
        <IconButton size="large" onClick={handleOpenAddQuestionModal}>
          <AddCircleIcon sx={{ fontSize: 48, color: COLORS.YELLOW }} />
        </IconButton>
        <Button onClick={getAllQuestionsRefetch}>Refetch</Button>
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
          paginationModel={{
            page: questionsData?.totalPages
              ? questionsData.totalPages <= paginationModel.page
                ? paginationModel.page - 1
                : paginationModel.page
              : paginationModel.page,
            pageSize: paginationModel.pageSize,
          }}
          // paginationModel={paginationModel}
          loading={isGetAllQuestionsLoading || isGetAllQuestionsFetching}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
        />
      </Box>
      {/* Table */}
      {/* START:  Modal */}
      {isAddQuestionModalOpen && (
        <QuestionModal
          isOpen={isAddQuestionModalOpen}
          onCloseModal={handleCloseAddQuestionModal}
        />
      )}
      {editQuestionModalState.open && (
        <EditQuestionModal
          isOpen={editQuestionModalState.open}
          questionId={editQuestionModalState.questionId}
          onCloseModal={handleCloseEditQuestionModal}
        />
      )}
      {/* END: Modal */}
    </Box>
  );
};

export default ManagementScreen;
