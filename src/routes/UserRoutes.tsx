import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import PlayScreen from "../views/PlayScreen";

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <PlayScreen />,
      },
    ],
  },
]);

const UserRoutes = () => {
  return <RouterProvider router={router} />;
};

export default UserRoutes;
