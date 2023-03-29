import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import AdminScreen from "../views/AdminScreen";
import ManagementScreen from "../views/ManagementScreen";
import PlayScreen from "../views/PlayScreen";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <AdminScreen />,
      },
      {
        path: "/play",
        element: <PlayScreen />,
      },
      {
        path: "/management",
        element: <ManagementScreen />,
      },
    ],
  },
]);

const AdminRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AdminRoutes;
