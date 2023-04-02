import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorScreen from "../components/ErrorScreen";
import Wrapper from "../layout/Wrapper";
import AdminScreen from "../views/AdminScreen";
import ManagementScreen from "../views/ManagementScreen";
import { sharedRoutes } from "./config";

const router = createBrowserRouter([
  {
    element: <Wrapper />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "/",
        element: <Navigate to="/admin" replace />,
      },
      {
        path: "/admin",
        element: <AdminScreen />,
      },
      {
        path: "/management",
        element: <ManagementScreen />,
      },
      ...sharedRoutes,
    ],
  },
]);

const AdminRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AdminRoutes;
