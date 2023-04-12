import { Grid } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useSignupMutation } from "../../api/AuthAPI";
import { ErrorResponseType } from "../../api/AuthAPI/types";
import AuthButtonContainer from "../../components/AuthButtonContainer";
import AuthHeader from "../../components/AuthHeader/AuthHeader";

import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { AuthContainer } from "../../styles/AuthScreen.styles";
import RegisterSuccessModal from "./RegistrationSuccessModal";
import { RegisterFormDataType } from "./types";
import Brand from "../../components/Brand";
import SubmitButton from "../../components/SubmitButton";

const RegisterScreen = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/");
  };

  const handleRegister = async (data: RegisterFormDataType) => {
    try {
      await signup(data).unwrap();
      setShowModal(true);
    } catch (error) {
      const err = error as ErrorResponseType;
      let errorMessage = "Signup failed. Please try again";

      if (err.status === 400) {
        errorMessage = err.data.message;
      }

      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  return (
    <AuthContainer container>
      <Brand />

      <Grid item xs={12} sm={12} md={6} p={4}>
        <AuthHeader title="Welcome!" subTitle="Create your account" />

        <RegisterForm onSubmitForm={handleRegister}>
          <SubmitButton loading={isLoading} content="Sign Up" />
        </RegisterForm>

        <AuthButtonContainer
          btnLeftUrl="/forgot-password"
          btnLeftContent="Forgot Password"
          btnRightUrl="/login"
          btnRightContent="Already have an account? Login here!"
        />
      </Grid>

      <RegisterSuccessModal
        open={showModal}
        onClose={handleCloseModal}
        onRedirect={navigateLogin}
      />
    </AuthContainer>
  );
};

export default RegisterScreen;
