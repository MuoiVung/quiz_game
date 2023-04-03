import { RouteObject } from "react-router-dom";
import InGameScreen from "../views/InGameScreen";
import PlayScreen from "../views/PlayScreen";
import ProfileScreen from "../views/ProfileScreen";

export const PATH = {
  LOGIN: "login",
  REGISTER: "register",
  FORGOT_PASSWORD: "forgot-password",
  UNAUTHORIZED: "unauthorized",
  ADMIN: "admin",
  MANAGEMENT: "management",
  PLAY: "play",
  PLAY_QUESTIONS: "play/:totalQuestions",
  PROFILE: "profile",
};
