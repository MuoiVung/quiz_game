import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import COLORS from "../constants/colors";
import {
  logout,
  selectCurrentUser,
  selectRefreshToken,
} from "../store/features/authSlice";
import { useTypedSelector } from "../store/store";
import IconSvg from "../components/IconSvg";
import { useLogoutMutation } from "../api/AuthAPI";
import { toast } from "react-toastify";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = useTypedSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const refreshToken = useTypedSelector(selectRefreshToken);

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      if (refreshToken) {
        await logoutMutation({ refresh_token: refreshToken });
      }
      dispatch(logout());
      navigate("/", { replace: true });
    } catch (error) {
      let errorMessage = "Logout error. Something went wrong!";

      toast.error(errorMessage, {
        position: "top-center",
      });
    }
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
        <Link to="/">
          <IconSvg name="brand" width={136} height={32} />
        </Link>

        <Box>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar alt={user?.name} src={user?.avatarLink} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
