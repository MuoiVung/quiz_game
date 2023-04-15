import { Avatar, styled } from "@mui/material";
import CustomModal from "../CustomModal/CustomModal";

export const StyledAvatar = styled(Avatar)({
  width: 60,
  height: 60,
});

export const PreviewAvatar = styled(Avatar)({
  width: 300,
  height: 300,
  border: "1px solid yellow",
});

export const PreviewModal = styled(CustomModal)({
  zIndex: 9999,
});
