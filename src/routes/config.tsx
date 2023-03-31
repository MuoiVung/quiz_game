import { RouteObject } from "react-router-dom";
import InGameScreen from "../views/InGameScreen";
import PlayScreen from "../views/PlayScreen";
import ProfileScreen from "../views/ProfileScreen";

export const sharedRoutes: RouteObject[] = [
  {
    path: "/profile",
    element: <ProfileScreen />,
  },
  {
    path: "/play",
    element: <PlayScreen />,
  },
  {
    path: "/play/:totalQuestions",
    element: <InGameScreen />,
  },
];
