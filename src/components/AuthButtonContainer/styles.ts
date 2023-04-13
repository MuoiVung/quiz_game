import { Stack, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const ButtonContainer = styled(Stack)(() => ({
  marginTop: "8px",
}));

export const ButtonItem = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  "& .MuiTypography-root": {
    textDecoration: "underline",
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down("lg")]: {
    padding: "4px 0",
    textAlign: "center",
  },
}));
