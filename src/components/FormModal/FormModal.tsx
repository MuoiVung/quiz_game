import { Close } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import CircularSpinner from "../CircularSpinner";
import { FormModalHeader, ModalContainer, ModalContent } from "./styles";
import { FormModalProps } from "./types";

const FormModal = ({
  open,
  onClose,
  children,
  title,
  isLoading,
}: FormModalProps) => {
  return (
    <>
      <ModalContainer open={open} onClose={onClose}>
        <ModalContent>
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={onClose}>
              <Close color="primary" />
            </IconButton>
          </Box>
          <Box pb={2} px={4}>
            <FormModalHeader variant="h4">{title}</FormModalHeader>
            {children}
          </Box>
        </ModalContent>
      </ModalContainer>
      <CircularSpinner isLoading={isLoading || false} />
    </>
  );
};

export default FormModal;
