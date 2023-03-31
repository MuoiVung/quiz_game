import { useEffect, useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import {
  AuthStateType,
  initCredentials,
  selectCurrentToken,
  selectCurrentUser,
} from "../store/features/authSlice";
import { useAppDispatch, useTypedSelector } from "../store/store";
import { decryptData } from "../utils/lsCryptoJS.util";
import AdminRoutes from "./AdminRoutes";
import PublicRoutes from "./PublicRoutes";
import UserRoutes from "./UserRoutes";

const Routes = () => {
  const user = useTypedSelector(selectCurrentUser);
  const token = useTypedSelector(selectCurrentToken);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
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

  if (token && user?.roles.includes("admin")) {
    return <AdminRoutes />;
  }

  if (token) {
    return <UserRoutes />;
  }

  return <PublicRoutes />;
};

export default Routes;
