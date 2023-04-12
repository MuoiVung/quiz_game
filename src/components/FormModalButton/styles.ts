import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material";

export const SubmitFormBtn = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.common.WHITE,
  [theme.breakpoints.down("md")]: {
    marginBottom: "16px",
  },
}));
