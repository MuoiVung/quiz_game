import { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Wrapper from "../layout/Wrapper";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../store/features/authSlice";
import { useTypedSelector } from "../store/store";
import { RoleType } from "../types";

const RequireAuth = ({ allowedRoles }: { allowedRoles: RoleType[] }) => {
  const user = useTypedSelector(selectCurrentUser);
  const token = useTypedSelector(selectCurrentToken);

  return user?.roles.find((role) => allowedRoles.includes(role)) ? (
    <Wrapper>
      <Outlet />
    </Wrapper>
  ) : token ? (
    <Navigate to="unauthorized" replace />
  ) : (
    <Navigate to="login" replace />
  );
};

export default memo(RequireAuth);
