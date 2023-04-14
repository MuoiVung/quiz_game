import { Box, CardContent, styled } from "@mui/material";

export const IconContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "& .MuiSvgIcon-root ": {
    width: 30,
    height: 30,
  },
  [theme.breakpoints.down("sm")]: {
    "& .MuiSvgIcon-root ": {
      width: 24,
      height: 24,
    },
  },
}));

export const StyledCardContent = styled(CardContent)({
  padding: "12px 16px",

  "&:last-child": {
    paddingBottom: "12px",
  },
});
