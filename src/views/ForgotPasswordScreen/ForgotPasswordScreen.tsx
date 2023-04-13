import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useResetPasswordMutation } from "../../api/AuthAPI";
import { ErrorResponseType } from "../../api/AuthAPI/types";

import AuthButtonContainer from "../../components/AuthButtonContainer/AuthButtonContainer";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import Brand from "../../components/Brand/Brand";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { AuthContainer } from "../../styles/AuthScreen.styles";
import { ForgotPasswordDataType } from "./types";

const defaultForgotPasswordValue: ForgotPasswordDataType = {
  email: "",
};

const validateSchema = yup
  .object({
    email: yup.string().email("Email is invalid").required("Email is required"),
  })
  .required();

const ForgotPasswordScreen = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordDataType>({
    resolver: yupResolver(validateSchema),
    defaultValues: defaultForgotPasswordValue,
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleRegister = async (data: ForgotPasswordDataType) => {
    try {
      await resetPassword(data).unwrap();
      reset();

      alert("Please check email for new password!");
    } catch (error) {
      const err = error as ErrorResponseType;
      alert(err.data.message);
    }
  };

  return (
    <AuthContainer container>
      <Brand />

      <Grid item xs={12} sm={8} md={5} p={4}>
        <AuthHeader
          title="Welcome Back!"
          subTitle="Please enter your email to reset password"
        />

        {/* FORM */}
        <Box component="form" onSubmit={handleSubmit(handleRegister)}>
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

          <SubmitButton loading={isLoading} content="Send" />
        </Box>
        {/* FORM */}

        <AuthButtonContainer
          btnLeftUrl="/register"
          btnLeftContent="Return to Sign Up"
          btnRightUrl="/login"
          btnRightContent="Return to Login here!"
        />
      </Grid>
    </AuthContainer>
  );
};

export default ForgotPasswordScreen;
