import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import ForgotPassWordScreen from "../views/ForgotPasswordScreen";
import LoginScreen from "../views/LoginScreen";
import RegisterScreen from "../views/RegisterScreen";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
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
