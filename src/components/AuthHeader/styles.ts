import { Box, styled } from "@mui/material";

export const WelcomeBrand = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

export const WelcomeTitle = styled(Box)(({ theme }) => ({
  textAlign: "center",
  margin: "40px 0",
  "& .MuiTypography-root": {
    color: theme.palette.common.BLACK_400,
  },
}));
