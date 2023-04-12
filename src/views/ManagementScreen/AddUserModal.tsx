import { Box, Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

import { AddUserFormType, BasicModalProps } from "./types";
import { ErrorResponseType } from "../../api/AuthAPI/types";
import { useCreateUserMutation } from "../../api/UsersAPI";
import CustomModal from "../../components/CustomModal/CustomModal";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import COLORS from "../../constants/colors";

const AddUserModal = ({ isOpen, onCloseModal }: BasicModalProps) => {
  const [addUser, { isLoading: isAddUserLoading }] = useCreateUserMutation();

  const handleAddUser = async (data: AddUserFormType) => {
    const addUserFormData: AddUserFormType = JSON.parse(JSON.stringify(data));
    if (addUserFormData.roles.length === 0) {
      addUserFormData.roles.push("user");
    }
    try {
      await addUser(addUserFormData).unwrap();

      onCloseModal();
    } catch (error) {
      const errorMessage = (error as ErrorResponseType).data.message;
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  const handleCloseModal = () => {
    onCloseModal();
  };

  return (
    <CustomModal onClose={handleCloseModal} open={isOpen}>
      <Typography
        variant="h4"
        fontFamily="poppins"
        sx={{
          textAlign: "center",
          mb: "12px",
        }}
      >
        Add User
      </Typography>

      <RegisterForm onSubmitForm={handleAddUser} hasRoleField>
        <Box display="flex" justifyContent="flex-end" my="16px">
          <LoadingButton
            loading={isAddUserLoading}
            type="submit"
            variant="contained"
            sx={{ color: COLORS.WHITE, mr: "12px" }}
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
      </RegisterForm>
    </CustomModal>
  );
};

export default AddUserModal;
