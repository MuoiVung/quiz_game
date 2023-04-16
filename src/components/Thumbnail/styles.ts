import { Avatar, styled } from "@mui/material";
import CustomModal from "../CustomModal/CustomModal";
import COLORS from "../../constants/colors";

export const StyledAvatar = styled(Avatar)({
  width: 60,
  height: 60,
  borderStyle: "solid",
  borderWidth: "1px",
  borderColor: COLORS.YELLOW_700,
});

export const PreviewAvatar = styled(Avatar)({
  width: 300,
  height: 300,
  border: "1px solid yellow",
});

export const PreviewModal = styled(CustomModal)({
  zIndex: 9999,
});
