import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box, IconButton } from "@mui/material";
import { GridCellParams, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useState } from "react";

import dayjs from "dayjs";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  usersApiSlice,
} from "../../api/UsersAPI";
import CircularSpinner from "../../components/CircularSpinner";
import DeleteModal from "../../components/DeleteModal";
import COLORS from "../../constants/colors";
import store from "../../store/store";
import AddUserModal from "./AddUserModal";
import DataTable from "./DataTable";
import EditUserModal from "./EditUserModal";
import { EditUserFormType, UserDataTableProps, UserRowType } from "./types";

const UserDataTable = ({
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
}: UserDataTableProps) => {
  const {
    data: usersData,
    isLoading: isGetAllUsersLoading,
    isFetching: isGetAllUsersFetching,
  } = useGetAllUsersQuery({
    page: paginationModel.page + 1,
    size: paginationModel.pageSize,
    keyWord: searchKeyWord,
    order: listOrder,
    sortField,
  });

  const [deleteUser, { isLoading: isDeleteUserLoading }] =
    useDeleteUserMutation();

  const [rowCountState, setRowCountState] = useState(usersData?.total || 0);

  const [userFormData, setUserFormData] = useState<EditUserFormType>({
    email: "",
    name: "",
    roles: [],
  });

  const [currentUserId, setCurrentUserId] = useState<null | number>(null);

  const [isGetUserLoading, setIsGetUserLoading] = useState(false);

  const handleShowDeleteUser = useCallback(
    (userId: number) => {
      onOpenDeleteModal();
      setCurrentUserId(userId);
    },
    [onOpenDeleteModal]
  );

  const handleDeleteUser = useCallback(async () => {
    if (!currentUserId) {
      return;
    }

    try {
      await deleteUser({ userId: currentUserId });
      if (
        usersData?.currentPage === usersData?.totalPages &&
        (usersData?.total || 0) % paginationModel.pageSize === 1
      ) {
        setPaginationModel((prev) => ({ ...prev, page: prev.page - 1 }));
      }
    } catch (error) {
      toast.error("Failed to delete this question. Please try again later.");
    } finally {
      onCloseDeleteModal();
    }
  }, [
    deleteUser,
    paginationModel.pageSize,
    usersData?.currentPage,
    usersData?.total,
    usersData?.totalPages,
    setPaginationModel,
    currentUserId,
    onCloseDeleteModal,
  ]);

  const handleEditUser = useCallback(
    async (userId: number) => {
      try {
        setIsGetUserLoading(true);

        const userData = await store
          .dispatch(
            usersApiSlice.endpoints.getUser.initiate({
              userId,
            })
          )
          .unwrap();

        const transformedUserForm = {
          email: userData?.data.email,
          name: userData?.data.name,
          roles: [...userData?.data.roles],
        };
        setUserFormData(transformedUserForm);
        onOpenEditModal(userId);
      } catch (error) {
        toast.error("Failed to get user information! Please try again later!");
      } finally {
        setIsGetUserLoading(false);
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
        field: "name",
        headerName: "Name",
        minWidth: 150,
        flex: 2,
      },
      {
        field: "email",
        headerName: "Email",
        minWidth: 150,
        flex: 2,
      },
      {
        field: "roles",
        headerName: "Roles",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "createdDay",
        headerName: "Created Day",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "updatedDay",
        headerName: "Updated Day",
        minWidth: 150,
        flex: 1,
      },
      {
        field: "avatar",
        headerName: "Avatar",
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
              onClick={() => handleEditUser(+params.id)}
            >
              <BorderColorOutlinedIcon />
            </IconButton>

            <IconButton
              sx={{
                ml: "8px",
                color: COLORS.RED,
              }}
              onClick={() => handleShowDeleteUser(+params.id)}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [handleEditUser, handleShowDeleteUser]
  );

  const transformQuestionsData: GridRowsProp<UserRowType> = useMemo(() => {
    if (!usersData?.result) {
      return [];
    }

    return usersData?.result.map((user, index) => ({
      id: user.id,
      seq: index + paginationModel.page * paginationModel.pageSize + 1,
      name: user.name,
      email: user.email,
      roles: user.roles.join(", "),
      createdDay: dayjs(user.created_at).format("DD/MM/YYYY"),
      updatedDay: dayjs(user.updated_at).format("DD/MM/YYYY"),
      avatar: user.avatar_link || "",
    }));
  }, [usersData?.result, paginationModel.page, paginationModel.pageSize]);

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      usersData?.total !== undefined ? usersData?.total : prevRowCountState
    );
  }, [usersData?.total]);

  return (
    <Box>
      <DataTable
        columns={columns}
        rows={transformQuestionsData}
        rowCount={rowCountState}
        paginationModel={{
          page: usersData?.totalPages
            ? usersData.totalPages <= paginationModel.page
              ? paginationModel.page - 1
              : paginationModel.page
            : paginationModel.page,
          pageSize: paginationModel.pageSize,
        }}
        loading={isGetAllUsersLoading || isGetAllUsersFetching}
        onPaginationModelChange={setPaginationModel}
      />
      {/* START:  Modal */}
      {isAddModalOpen && (
        <AddUserModal isOpen={isAddModalOpen} onCloseModal={onCloseAddModal} />
      )}
      {editModalState.open && (
        <EditUserModal
          isOpen={editModalState.open}
          userId={editModalState.id}
          onCloseModal={onCloseEditModal}
          userFormData={userFormData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isLoading={isDeleteUserLoading}
          title="Delete User"
          onCloseModal={onCloseDeleteModal}
          onConfirmDelete={handleDeleteUser}
          open={isDeleteModalOpen}
        />
      )}
      {isGetUserLoading && <CircularSpinner isLoading={isGetUserLoading} />}
      {/* END: Modal */}
    </Box>
  );
};

export default UserDataTable;
