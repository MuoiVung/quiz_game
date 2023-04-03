// import { useEffect, useState } from "react";
// import LoadingScreen from "../components/LoadingScreen";
// import {
//   AuthStateType,
//   initCredentials,
//   selectCurrentToken,
//   selectCurrentUser,
// } from "../store/features/authSlice";
// import { useAppDispatch, useTypedSelector } from "../store/store";
// import { decryptData } from "../utils/lsCryptoJS.util";
// import AdminRoutes from "./AdminRoutes";
// import PublicRoutes from "./PublicRoutes";
// import UserRoutes from "./UserRoutes";

// const Routes = () => {
//   const user = useTypedSelector(selectCurrentUser);
//   const token = useTypedSelector(selectCurrentToken);
//   const [isLoading, setIsLoading] = useState(false);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     console.log("routes useEffect: ", user);
//     const auth: AuthStateType | null = decryptData("auth");

//     if (!auth) {
//       setIsLoading(true);

//       return;
//     }

//     setIsLoading(true);

//     dispatch(initCredentials(auth));
//   }, [dispatch]);

//   if (!isLoading) {
//     return <LoadingScreen />;
//   }

//   if (token && user?.roles.includes("admin")) {
//     return <AdminRoutes />;
//   }

//   if (token) {
//     return <UserRoutes />;
//   }

//   return <PublicRoutes />;
// };

// export default Routes;

import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ErrorScreen from "../components/ErrorScreen";
import LoadingScreen from "../components/LoadingScreen";
import RequireAuth from "../components/RequireAuth";
import UnauthorizedScreen from "../components/UnauthorizedScreen";
import {
  AuthStateType,
  initCredentials,
  selectCurrentToken,
  selectCurrentUser,
} from "../store/features/authSlice";
import { useAppDispatch, useTypedSelector } from "../store/store";
import { decryptData } from "../utils/lsCryptoJS.util";
import AdminScreen from "../views/AdminScreen";
import ForgotPasswordScreen from "../views/ForgotPasswordScreen";
import InGameScreen from "../views/InGameScreen";
import LoginScreen from "../views/LoginScreen";
import ManagementScreen from "../views/ManagementScreen";
import PlayScreen from "../views/PlayScreen";
import ProfileScreen from "../views/ProfileScreen";
import RegisterScreen from "../views/RegisterScreen";
import { PATH } from "./config";

const MainRoutes = () => {
  const user = useTypedSelector(selectCurrentUser);
  const token = useTypedSelector(selectCurrentToken);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("routes useEffect");
    const auth: AuthStateType | null = decryptData("auth");

    if (!auth) {
      setIsLoading(true);

      return;
    }

    setIsLoading(true);

    dispatch(initCredentials(auth));
  }, [dispatch]);

  if (!isLoading) {
    return <LoadingScreen />;
  }
  let initPath = PATH.LOGIN;

  if (token && user?.roles.includes("admin")) {
    initPath = PATH.ADMIN;
  } else if (token) {
    initPath = PATH.PLAY;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Navigate to={initPath} />} />
      <Route path={PATH.LOGIN} element={<LoginScreen />} />
      <Route path={PATH.REGISTER} element={<RegisterScreen />} />
      <Route path={PATH.FORGOT_PASSWORD} element={<ForgotPasswordScreen />} />
      <Route path={PATH.UNAUTHORIZED} element={<UnauthorizedScreen />} />

      {/* Admin routes */}
      <Route element={<RequireAuth allowedRoles={["admin"]} />}>
        <Route path={PATH.ADMIN} element={<AdminScreen />} />
        <Route path={PATH.MANAGEMENT} element={<ManagementScreen />} />
      </Route>

      {/* User & Admin routes */}
      <Route element={<RequireAuth allowedRoles={["admin", "user"]} />}>
        <Route path={PATH.PLAY} element={<PlayScreen />} />
        <Route path={PATH.PROFILE} element={<ProfileScreen />} />
        <Route path={PATH.PLAY_QUESTIONS} element={<InGameScreen />} />
      </Route>

      {/* Error */}
      <Route path="*" element={<ErrorScreen />} />
    </Routes>
  );
};

export default MainRoutes;
