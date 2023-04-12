import { Grid, styled } from "@mui/material";

export const BrandContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.common.GRAY_100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
