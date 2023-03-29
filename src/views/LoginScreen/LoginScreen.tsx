import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useLoginMutation } from "../../api/AuthAPI";
import { ErrorResponseType } from "../../api/AuthAPI/types";

import IconSvg from "../../components/IconSvg";
import COLORS from "../../constants/colors";
import { setCredentials } from "../../store/features/authSlice";
import { useAppDispatch } from "../../store/store";
import { LoginFormDataType } from "./types";

const defaultLoginValues: LoginFormDataType = {
  email: "",
  password: "",
};

const validateSchema = yup
  .object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])(?=.*[^\da-zA-Z]).{8,}$/,
    //   "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
    // ),
  })
  .required();

const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormDataType>({
    resolver: yupResolver(validateSchema),
    defaultValues: defaultLoginValues,
  });

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleLogin = async (data: LoginFormDataType) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      reset();
    } catch (error) {
      const err = error as ErrorResponseType;
      console.error(err.data.message);
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
            Please login to your account
          </Typography>
        </Box>
        {/* FORM */}
        <Box component="form" onSubmit={handleSubmit(handleLogin)}>
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            loading={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: COLORS.WHITE, py: "12px" }}
          >
            Sign in
          </LoadingButton>
        </Box>
        {/* FORM */}
        <Grid container>
          <Grid item xs>
            <Link to="/forgot-password" style={{ textDecoration: "none" }}>
              <Typography color="primary" sx={{ textDecoration: "underline" }}>
                Forgot Password
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography color="primary" sx={{ textDecoration: "underline" }}>
                Don't have an account? Sign Up
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

export default LoginScreen;