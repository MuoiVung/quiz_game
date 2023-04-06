import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useState } from "react";

import { OrderType, QuestionSortFieldType } from "../../api/QuestionsAPI/types";
import COLORS from "../../constants/colors";
import QuestionDataTable from "./QuestionDataTable";
import { MangementType } from "./types";
import UserDataTable from "./UserDataTable";
import { UserSortFiedType } from "../../api/UsersAPI/types";

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
        </FormControl>
        {/* End: Sort */}
        {/* Start: Search - Add new Question/User */}
        <IconButton size="large" onClick={handleOpenAddModal}>
          <AddCircleIcon sx={{ fontSize: 48, color: COLORS.YELLOW }} />
        </IconButton>

        {/* End: Search - Add new Question/User */}
      </Box>
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
