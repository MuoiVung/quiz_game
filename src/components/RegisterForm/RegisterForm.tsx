import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { RegisterFormDataType, RegisterFormProps } from "./types";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ErrorResponseType } from "../../api/AuthAPI/types";

const defaultRegisterUser: RegisterFormDataType = {
  email: "",
  name: "",
  password: "",
  retypePassword: "",
  roles: ["user"],
};

const schema = yup
  .object({
    name: yup
      .string()
      .max(100, "Name must be less than 100 characters")
      .required("Name is required"),
    email: yup
      .string()
      .email("Email is invalid")
      .max(100, "Email must be less than 100 characters")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    retypePassword: yup
      .string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters")
      .oneOf([yup.ref("password")], "New passwords do not match"),
    roles: yup.array().min(1, "At least one role must be checked").required(),
  })
  .required();

const RegisterForm = ({
  children,
  hasRoleField = false,
  onSubmitForm,
}: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormDataType>({
    resolver: yupResolver(schema),
    defaultValues: defaultRegisterUser,
  });

  const handleSubmitForm = async (data: RegisterFormDataType) => {
    try {
      await onSubmitForm(data);
      toast.success("Create user successfully!");
      reset();
    } catch (error) {
      const errorMessage = (error as ErrorResponseType).data.message;
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleSubmitForm)}>
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
      <TextField
        type="password"
        required
        {...register("retypePassword")}
        error={errors.retypePassword ? true : false}
        helperText={errors.retypePassword?.message}
        name="retypePassword"
        label="Re-type Password"
        fullWidth
        margin="normal"
        autoComplete="true"
      />
      {hasRoleField && (
        <>
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
        </>
      )}
      {/* Submit button */}
      {children}
    </Box>
  );
};

export default RegisterForm;
