import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useState } from "react";

import { OrderType, QuestionSortFieldType } from "../../api/QuestionsAPI/types";
import { UserSortFiedType } from "../../api/UsersAPI/types";
import QuestionDataTable from "./QuestionDataTable";
import UserDataTable from "./UserDataTable";
import { FunctionBar, FunctionItem } from "./styles";
import { MangementType } from "./types";

const ManagementScreen = () => {
  const [type, setType] = useState<MangementType>("question");

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const [listOrder, setListOrder] = useState<OrderType>("ASC");
  const [questionSortField, setQuestionSortField] =
    useState<QuestionSortFieldType>("id");
  const [userSortField, setUserSortField] = useState<UserSortFiedType>("id");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editModalState, setEditModalState] = useState({
    open: false,
    id: 0,
  });

  const handleSelectType = (event: SelectChangeEvent) => {
    setType(event.target.value as MangementType);
  };

  const handleSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyWord(event.target.value);
  }, 500);

  const handleSelectOrder = (event: SelectChangeEvent) => {
    setListOrder(event.target.value as OrderType);
  };

  const handleQuestionSort = (event: SelectChangeEvent) => {
    setQuestionSortField(event.target.value as QuestionSortFieldType);
  };

  const handleUserSort = (event: SelectChangeEvent) => {
    setUserSortField(event.target.value as UserSortFiedType);
  };

  const handleOpenAddModal = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const handleCloseAddModal = useCallback(() => {
    setIsAddModalOpen(false);
  }, []);

  const handleOpenEditModal = useCallback((id: number) => {
    setEditModalState({
      open: true,
      id,
    });
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setEditModalState((prevState) => ({ ...prevState, open: false }));
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <FunctionBar direction={{ md: "row" }} spacing={2}>
        {/* Start: Questions/Users */}
        <FunctionItem>
          <Select value={type} onChange={handleSelectType} displayEmpty>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="question">Question</MenuItem>
          </Select>
        </FunctionItem>
        {/* End: Questions/Users */}

        {/* Search */}
        <FunctionItem>
          <TextField
            label="Search"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </FunctionItem>
        {/* Search */}

        {/* Start: Order */}
        <FunctionItem>
          <Select value={listOrder} onChange={handleSelectOrder}>
            <MenuItem value="ASC">ASC</MenuItem>
            <MenuItem value="DESC">DESC</MenuItem>
          </Select>
        </FunctionItem>
        {/* End: Order */}
        {/* Start: Sort */}
        <FunctionItem>
          {type === "question" && (
            <Select value={questionSortField} onChange={handleQuestionSort}>
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="createdAt">Created At</MenuItem>
              <MenuItem value="updatedAt">Updated At</MenuItem>
            </Select>
          )}
          {type === "user" && (
            <Select value={userSortField} onChange={handleUserSort}>
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="created_at">Created Day</MenuItem>
              <MenuItem value="updated_at">Updated Day</MenuItem>
            </Select>
          )}
        </FunctionItem>
        {/* End: Sort */}
        {/* Start: Search - Add new Question/User */}
        {/* <IconButton size="large" onClick={handleOpenAddModal}>
          <AddCircleIcon sx={{ fontSize: 48, color: COLORS.YELLOW }} />
        </IconButton> */}

        <Button
          onClick={handleOpenAddModal}
          startIcon={<AddCircleIcon />}
          variant="contained"
        >
          {type === "user" ? "Add User" : "Add Question"}
        </Button>

        {/* End: Search - Add new Question/User */}
      </FunctionBar>
      {/* Table */}
      <Box sx={{ height: 200, mt: "24px" }}>
        {type === "question" && (
          <QuestionDataTable
            listOrder={listOrder}
            paginationModel={paginationModel}
            searchKeyWord={searchKeyWord}
            setPaginationModel={setPaginationModel}
            sortField={questionSortField}
            isAddModalOpen={isAddModalOpen}
            onCloseAddModal={handleCloseAddModal}
            onCloseEditModal={handleCloseEditModal}
            onOpenEditModal={handleOpenEditModal}
            editModalState={editModalState}
          />
        )}
        {type === "user" && (
          <UserDataTable
            listOrder={listOrder}
            paginationModel={paginationModel}
            searchKeyWord={searchKeyWord}
            setPaginationModel={setPaginationModel}
            sortField={userSortField}
            isAddModalOpen={isAddModalOpen}
            onCloseAddModal={handleCloseAddModal}
            onCloseEditModal={handleCloseEditModal}
            onOpenEditModal={handleOpenEditModal}
            editModalState={editModalState}
          />
        )}
      </Box>
      {/* Table */}
    </Box>
  );
};

export default ManagementScreen;
