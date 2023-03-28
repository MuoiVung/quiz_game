import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ForgotPassWordScreen from "./ForgotPasswordScreen";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/register",
    element: <RegisterScreen />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassWordScreen />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
