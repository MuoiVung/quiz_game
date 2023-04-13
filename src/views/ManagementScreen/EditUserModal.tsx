import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
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
import { memo } from "react";

import { EditUserFormType, EditUserModalProps } from "./types";
import { useUpdateUserMutation } from "../../api/UsersAPI";
import FormModal from "../../components/FormModal/FormModal";
import FormModalButton from "../../components/FormModalButton/FormModalButton";

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
  userFormData,
}: EditUserModalProps) => {
  const [updateUser, { isLoading: isUpdateUserLoading }] =
    useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserFormType>({
    resolver: yupResolver(userValidateSchema),
    defaultValues: userFormData,
  });

  const handleEditUser = async (formData: EditUserFormType) => {
    try {
      const { roles: formDataRoles } = formData;
      const { roles: defaultRoles } = userFormData;
      const areRolesSame = isEqual(formDataRoles, defaultRoles);

      if (
        formData.email !== userFormData.email ||
        formData.name !== userFormData.name ||
        !areRolesSame
      ) {
        await updateUser({ ...formData, userId });
      }
      reset();
      onCloseModal();
    } catch (error) {
      toast.error("Failed to edit user!", {
        position: "top-center",
      });
    }
  };

  const handleCloseModal = () => {
    reset();
    onCloseModal();
  };

  return (
    <FormModal
      onClose={handleCloseModal}
      open={isOpen}
      title="Edit User"
      isLoading={isUpdateUserLoading}
    >
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
          autoComplete="true"
          margin="normal"
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
          autoComplete="true"
          margin="normal"
        />
        <Typography sx={{ mt: "12px" }}>
          Must choose at least one role
        </Typography>
        <FormGroup row>
          <FormControlLabel
            {...register("roles")}
            control={
              <Checkbox defaultChecked={userFormData.roles.includes("user")} />
            }
            label="User"
            value="user"
          />
          <FormControlLabel
            {...register("roles")}
            control={
              <Checkbox defaultChecked={userFormData.roles.includes("admin")} />
            }
            value="admin"
            label="Admin"
          />
        </FormGroup>
        {/* Buttons */}
        <FormModalButton
          loading={isUpdateUserLoading}
          onCloseModal={handleCloseModal}
        />
      </Box>
    </FormModal>
  );
};

export default memo(EditUserModal);
