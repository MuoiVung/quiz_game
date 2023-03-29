import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useResetPasswordMutation } from "../../api/AuthAPI";
import { ErrorResponseType } from "../../api/AuthAPI/types";

import IconSvg from "../../components/IconSvg";
import COLORS from "../../constants/colors";
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
    <Grid component="main" container sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        p={4}
        sx={{ backgroundColor: COLORS.WHITE }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconSvg name="brand" />
        </Box>
        <Box
          sx={{
            textAlign: "center",
            my: "40px",
          }}
        >
          <Typography
            sx={{
              color: "rgba(0,0,0,0.6)",
            }}
          >
            Welcome Back!
          </Typography>
          <Typography
            sx={{
              color: "rgba(0,0,0,0.6)",
            }}
          >
            Please enter your email to reset password
          </Typography>
        </Box>
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
          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: COLORS.WHITE, py: "12px" }}
          >
            Send
          </LoadingButton>
        </Box>
        {/* FORM */}
        <Grid container>
          <Grid item xs>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography color="primary" sx={{ textDecoration: "underline" }}>
                Don't have an account? Sign Up
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography color="primary" sx={{ textDecoration: "underline" }}>
                Already have an account? Login here!
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: COLORS.GRAY_100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconSvg name="hands_graduate" />
      </Grid>
    </Grid>
  );
};

export default ForgotPasswordScreen;
