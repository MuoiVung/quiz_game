import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { useLoginMutation } from "../../api/AuthAPI";
import IconSvg from "../../components/IconSvg";
import COLORS from "../../constants/colors";
import { setCredentials } from "../../store/features/authSlice";
import { useAppDispatch } from "../../store/store";
import { LoginFormDataType } from "./types";
import { updateNumber } from "../../store/features/numberSlice";

const defaultLoginValues: LoginFormDataType = {
  email: "",
  password: "",
  isRemember: false,
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
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormDataType) => {
    try {
      const result = await login(data).unwrap();
      dispatch(
        setCredentials({
          authState: result,
          isRemember: data.isRemember,
        })
      );
      reset();
      navigate("/", { replace: true, state: {} });
    } catch (error) {
      let errorMessage = "Invalid email or password. Please try again.";
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  // const handleUpdateNumber = () => {
  //   dispatch(updateNumber());
  // };

  return (
    <Grid component="main" container sx={{ height: "100vh" }}>
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
            control={
              <Checkbox
                {...register("isRemember")}
                // value="true"
                color="primary"
              />
            }
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/forgot-password" style={{ textDecoration: "none" }}>
            <Typography color="primary" sx={{ textDecoration: "underline" }}>
              Forgot Password
            </Typography>
          </Link>

          <Link to="/register" style={{ textDecoration: "none" }}>
            <Typography color="primary" sx={{ textDecoration: "underline" }}>
              Don't have an account? Sign Up
            </Typography>
          </Link>
        </Box>
      </Grid>
      {/* Test */}
      {/* <Button onClick={handleUpdateNumber}>Update number</Button> */}
    </Grid>
  );
};

export default LoginScreen;
