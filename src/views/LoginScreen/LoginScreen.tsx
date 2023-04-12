import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { useLoginMutation } from "../../api/AuthAPI";
import { setCredentials } from "../../store/features/authSlice";
import { useAppDispatch } from "../../store/store";
import { AuthContainer } from "../../styles/AuthScreen.styles";
import AuthButtonContainer from "../../components/AuthButtonContainer";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import { LoginFormDataType } from "./types";
import Brand from "../../components/Brand";
import SubmitButton from "../../components/SubmitButton";

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

  return (
    <AuthContainer>
      <Brand />

      <Grid item xs={12} sm={8} md={6} p={4}>
        <AuthHeader
          title="Welcome Back!"
          subTitle="Please login to your account"
        />

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
          <SubmitButton loading={isLoading} content="Sign in" />
        </Box>

        <AuthButtonContainer
          btnLeftUrl="/forgot-password"
          btnLeftContent="Forgot Password"
          btnRightUrl="/register"
          btnRightContent="Don't have an account? Sign Up"
        />
      </Grid>
    </AuthContainer>
  );
};

export default LoginScreen;
