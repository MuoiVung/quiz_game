import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal } from "@mui/material";
import { ReactNode } from "react";

type CustomModalProps = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
};

const CustomModal = ({ open, onClose, children }: CustomModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={onClose} sx={{ mb: "3px" }}>
            <Close color="primary" />
          </IconButton>
        </Box>
        <Box py={2} px={4}>
          {children}
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
