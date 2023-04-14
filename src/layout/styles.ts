import { Stack, Toolbar, styled } from "@mui/material";

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  //   margin: "16px 0",
}));

export const StyledNavbarBtn = styled(Stack)(({ theme }) => ({
  "& .username": {
    color: theme.palette.common.BLACK,
    marginLeft: "0.5rem",
  },

  "& .icon": {
    color: theme.palette.common.BLACK,
  },
}));
