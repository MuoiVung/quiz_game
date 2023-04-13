import { Box, Modal, Typography, styled } from "@mui/material";
import FONTS from "../../constants/fonts";

export const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
  overflow: "scroll",
  maxHeight: "95%",
  minWidth: 300,

  [theme.breakpoints.up("md")]: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  [theme.breakpoints.down("xs")]: {
    minWidth: 0,
    width: "100%",
  },
}));

export const ModalContainer = styled(Modal)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    padding: "24px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    margin: "8px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "8px",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: "8px",
  },
}));

export const FormModalHeader = styled(Typography)(({ theme }) => ({
  fontFamily: FONTS.POPPINS,
  textAlign: "center",
  marginBottom: 16,
  textTransform: "capitalize",
}));
