import { Avatar, Button, styled } from "@mui/material";
import CustomModal from "../CustomModal/CustomModal";

export const StyledAvatar = styled(Avatar)({
  width: 60,
  height: 60,
});

export const ThumbnailContainer = styled(Button)(({ theme }) => ({
  borderRadius: 999,
}));

export const PreviewAvatar = styled(Avatar)({
  width: 300,
  height: 300,
});

export const PreviewModal = styled(CustomModal)({
  zIndex: 9999,
});
