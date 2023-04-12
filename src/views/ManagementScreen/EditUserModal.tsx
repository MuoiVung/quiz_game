import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { isEqual } from "lodash";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";

import { EditUserFormType, EditUserModalProps } from "./types";

import { useGetUserQuery, useUpdateUserMutation } from "../../api/UsersAPI";
import CustomModal from "../../components/CustomModal/CustomModal";
import COLORS from "../../constants/colors";
import FormModalButton from "../../components/FormModalButton/FormModalButton";
import FormModal from "../../components/FormModal/FormModal";

const userValidateSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    roles: yup.array().min(1, "At least one role must be checked").required(),
  })
  .required();

const EditUserModal = ({
  isOpen,
  onCloseModal,
  userId,
}: EditUserModalProps) => {
  const {
    data: userData,
    isLoading: isGetUserLoading,
    isFetching: isGetUserFetching,
  } = useGetUserQuery({ userId });

  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();

  const defaultValues: EditUserFormType = {
    email: userData?.data.email || " ",
    name: userData?.data.name || " ",
    roles: userData?.data.roles ? [...userData?.data.roles] : [],
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserFormType>({
    resolver: yupResolver(userValidateSchema),
    defaultValues: defaultValues,
  });

  const handleEditUser = async (formData: EditUserFormType) => {
    try {
      const { roles: formDataRoles } = formData;
      const { roles: defaultRoles } = defaultValues;
      const areRolesSame = isEqual(formDataRoles, defaultRoles);

      if (
        formData.email !== defaultValues.email ||
        formData.name !== defaultValues.name ||
        !areRolesSame
      ) {
        await updateUser({ ...formData, userId });
      }
      toast.success("Edit question successuflly!");
      reset();
      onCloseModal();
    } catch (error) {
      toast.error("Failed to edit question!", {
        position: "top-center",
      });
    }
  };

  const handleCloseModal = () => {
    reset();
    onCloseModal();
  };

  return (
    <FormModal onClose={handleCloseModal} open={isOpen}>
      <Typography
        variant="h4"
        fontFamily="poppins"
        sx={{
          textAlign: "center",
          mb: "12px",
        }}
      >
        Edit User
      </Typography>
      {/* START: ADD QUESTION FORM */}
      <Box component="form" onSubmit={handleSubmit(handleEditUser)}>
        <TextField
          required
          {...register("name")}
          error={errors.name ? true : false}
          helperText={errors.name?.message}
          name="name"
          label="Name"
          autoFocus
          fullWidth
          margin="normal"
          autoComplete="true"
        />
        <TextField
          required
          {...register("email")}
          error={errors.email ? true : false}
          helperText={errors.email?.message}
          name="email"
          label="Email"
          autoFocus
          fullWidth
          margin="normal"
          autoComplete="true"
        />
        <Typography sx={{ mt: "12px" }}>
          Must choose at least one role
        </Typography>
        <FormGroup row>
          <FormControlLabel
            {...register("roles")}
            control={
              <Checkbox defaultChecked={defaultValues.roles.includes("user")} />
            }
            label="User"
            value="user"
          />
          <FormControlLabel
            {...register("roles")}
            control={
              <Checkbox
                defaultChecked={defaultValues.roles.includes("admin")}
              />
            }
            value="admin"
            label="Admin"
          />
        </FormGroup>
        {/* Buttons */}
        <FormModalButton
          loading={isUpdateUserLoading || isGetUserFetching || isGetUserLoading}
          onCloseModal={handleCloseModal}
        />
      </Box>
      {/* END: ADD QUESTION FORM */}
    </FormModal>
  );
};

export default EditUserModal;
