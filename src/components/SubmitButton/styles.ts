import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material";

export const StyledSubmitButton = styled(LoadingButton)(({ theme }) => ({
  margin: "24px 0 16px 0",
  color: theme.palette.common.WHITE,
  padding: "12px 0",
}));
