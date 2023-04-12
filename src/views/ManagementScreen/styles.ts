import { Box, Stack, styled } from "@mui/material";

export const FunctionBar = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    alignItems: "center",
  },
}));

export const FunctionItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
}));
