import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import IconSvg from "../components/IconSvg";
import COLORS from "../constants/colors";
import { logout, selectCurrentUser } from "../store/features/authSlice";
import { useTypedSelector } from "../store/store";
import { useGetUserProfleQuery } from "../api/UsersAPI";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = useTypedSelector(selectCurrentUser);
  const navigate = useNavigate();

  const { data: userProfileData } = useGetUserProfleQuery();

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNavigateProfile = () => {
    setAnchorEl(null);
    navigate("/profile", {
      replace: true,
      state: { userId: user?.id || (userProfileData?.id as number) },
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    dispatch(logout());
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: COLORS.WHITE,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 1,
        }}
      >
        <Link to={user?.roles.includes("admin") ? "admin" : "play"} replace>
          <IconSvg name="brand" width={136} height={32} />
        </Link>

        <Box>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar alt={user?.name} src={userProfileData?.avatar_link} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleNavigateProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Navbar);
