import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { ModalContainer, ModalContent } from "./styles";
import { FormModalProps } from "./types";

const FormModal = ({ open, onClose, children }: FormModalProps) => {
  return (
    <ModalContainer open={open} onClose={onClose}>
      <ModalContent>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <Close color="primary" />
          </IconButton>
        </Box>

        <Box py={2} px={4}>
          {children}
        </Box>
      </ModalContent>
    </ModalContainer>
  );
};

export default FormModal;
