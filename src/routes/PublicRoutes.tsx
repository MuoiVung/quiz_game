import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorScreen from "../components/ErrorScreen";
import ForgotPassWordScreen from "../views/ForgotPasswordScreen";
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";

const router = createBrowserRouter([
  {
    errorElement: <ErrorScreen />,
    children: [
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
    ],
  },
]);

const PublicRoutes = () => {
  return <RouterProvider router={router} />;
};

export default PublicRoutes;
