import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AddUserFormType, BasicModalProps } from "./types";

import { LoadingButton } from "@mui/lab";
import CustomModal from "../../components/CustomModal";
import COLORS from "../../constants/colors";
import { useCreateUserMutation } from "../../api/UsersAPI";
import { toast } from "react-toastify";
import { ErrorResponseType } from "../../api/AuthAPI/types";

const defaultAddUser: AddUserFormType = {
  email: "",
  name: "",
  password: "",
  roles: [],
};

const userValidateSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    roles: yup.array().min(1, "At least one role must be checked").required(),
  })
  .required();

const AddUserModal = ({ isOpen, onCloseModal }: BasicModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddUserFormType>({
    resolver: yupResolver(userValidateSchema),
    defaultValues: defaultAddUser,
  });

  const [addUser, { isLoading: isAddUserLoading }] = useCreateUserMutation();

  const handleAddUser = async (data: AddUserFormType) => {
    const addUserFormData: AddUserFormType = JSON.parse(JSON.stringify(data));
    if (addUserFormData.roles.length === 0) {
      addUserFormData.roles.push("user");
    }
    try {
      await addUser(addUserFormData).unwrap();
      toast.success("Add new user successfully!");
      reset();
      onCloseModal();
    } catch (error) {
      const errorMessage = (error as ErrorResponseType).data.message;
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  const handleCloseModal = () => {
    reset();
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
      {/* START: ADD QUESTION FORM */}
      <Box component="form" onSubmit={handleSubmit(handleAddUser)}>
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
        <TextField
          type="password"
          required
          {...register("password")}
          error={errors.password ? true : false}
          helperText={errors.password?.message}
          name="password"
          label="Password"
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
            control={<Checkbox />}
            label="User"
            value="user"
          />
          <FormControlLabel
            {...register("roles")}
            control={<Checkbox />}
            label="Admin"
            value="admin"
          />
        </FormGroup>
        {/* Buttons */}
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
      </Box>
      {/* END: ADD QUESTION FORM */}
    </CustomModal>
  );
};

export default AddUserModal;
