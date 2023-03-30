import * as React from "react";
import { Modal, Typography, Button, Box, IconButton } from "@mui/material";
import { RegisterSuccessModalProps } from "./types";
import { Close } from "@mui/icons-material";

const RegisterSuccessModal = ({
  open,
  onClose,
  onRedirect,
}: RegisterSuccessModalProps) => {
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
        <Box p={4}>
          <Typography variant="h5" component="h2" align="center">
            Registration Successful!
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Your account has been created successfully.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button variant="contained" color="primary" onClick={onRedirect}>
              Back to login
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default RegisterSuccessModal;
