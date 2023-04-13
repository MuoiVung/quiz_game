import { Box, SelectChangeEvent } from "@mui/material";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useState } from "react";

import { OrderType, QuestionSortFieldType } from "../../api/QuestionsAPI/types";
import { UserSortFiedType } from "../../api/UsersAPI/types";
import ManagementToolbar from "../../components/ManagementToolbar";
import QuestionDataTable from "./QuestionDataTable";
import UserDataTable from "./UserDataTable";
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleOpenDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <ManagementToolbar
        managementType={type}
        onSelectMangementType={handleSelectType}
        onSearch={handleSearch}
        listOrder={listOrder}
        onSelectOrder={handleSelectOrder}
        questionSortField={questionSortField}
        onSortQuestion={handleQuestionSort}
        userSortField={userSortField}
        onSortUser={handleUserSort}
        onOpenModal={handleOpenAddModal}
      />
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
            isDeleteModalOpen={isDeleteModalOpen}
            onOpenDeleteModal={handleOpenDeleteModal}
            onCloseDeleteModal={handleCloseDeleteModal}
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
            isDeleteModalOpen={isDeleteModalOpen}
            onOpenDeleteModal={handleOpenDeleteModal}
            onCloseDeleteModal={handleCloseDeleteModal}
          />
        )}
      </Box>
      {/* Table */}
    </Box>
  );
};

export default ManagementScreen;
