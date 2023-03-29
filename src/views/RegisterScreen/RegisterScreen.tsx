import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useLoginMutation, useSignupMutation } from "../../api/AuthAPI";
import { ErrorResponseType } from "../../api/AuthAPI/types";

import IconSvg from "../../components/IconSvg";
import COLORS from "../../constants/colors";
import { setCredentials } from "../../store/features/authSlice";
import { useAppDispatch } from "../../store/store";
import { RegisterFormDataType } from "./types";

const defaultRegisterValues: RegisterFormDataType = {
  name: "",
  email: "",
  password: "",
};

const validateSchema = yup
  .object({
    name: yup.string().required("Name is required"),
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

const RegisterScreen = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormDataType>({
    resolver: yupResolver(validateSchema),
    defaultValues: defaultRegisterValues,
  });

  const [signup, { isLoading }] = useSignupMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleRegister = async (data: RegisterFormDataType) => {
    try {
      await signup(data).unwrap();
      const result = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      dispatch(setCredentials(result));
      reset();

      navigate("/");
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
            Please login to your account
          </Typography>
        </Box>
        {/* FORM */}
        <Box component="form" onSubmit={handleSubmit(handleRegister)}>
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
          <LoadingButton
            loading={isLoading || isLoginLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, color: COLORS.WHITE, py: "12px" }}
          >
            Sign up
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

export default RegisterScreen;
