import {
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorScreen from "../components/ErrorScreen";
import Wrapper from "../layout/Wrapper";
import { sharedRoutes } from "./config";

const router = createBrowserRouter([
  {
    element: <Wrapper />,
    errorElement: <ErrorScreen />,
    children: [
      {
        path: "/",
        element: <Navigate to="/play" replace />,
      },
      ...sharedRoutes,
    ],
  },
]);

const UserRoutes = () => {
  return <RouterProvider router={router} />;
};

export default UserRoutes;
