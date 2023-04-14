import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useGetUserProfleQuery } from "../api/UsersAPI";
import IconSvg from "../components/IconSvg";
import COLORS from "../constants/colors";
import { logout, selectCurrentUser } from "../store/features/authSlice";
import { useTypedSelector } from "../store/store";
import { StyledNavbarBtn, StyledToolbar } from "./styles";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const user = useTypedSelector(selectCurrentUser);
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

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
        background: COLORS.WHITE,
      }}
    >
      <StyledToolbar>
        <Link to={user?.roles.includes("admin") ? "admin" : "play"} replace>
          <IconSvg name="brand" width={136} height={32} />
        </Link>

        <Box>
          <IconButton onClick={handleMenuOpen} disableRipple={true}>
            <StyledNavbarBtn
              direction="row"
              spacing={0.5}
              alignItems="center"
              display={{ xs: "none", sm: "flex" }}
            >
              <Avatar alt={user?.name} src={userProfileData?.avatar_link} />
              <Typography className="username">{user?.name}</Typography>
              <KeyboardArrowDownIcon className="icon" />
            </StyledNavbarBtn>
            <Box display={{ xs: "block", sm: "none" }} color="black">
              <MenuIcon />
            </Box>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={handleNavigateProfile}
              sx={{
                minWidth: "140px",
              }}
            >
              <ListItemIcon color="black">
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            {!matches && <Divider />}
            <MenuItem onClick={handleLogout}>
              <ListItemIcon color="black">
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </StyledToolbar>
    </AppBar>
  );
};

export default memo(Navbar);
