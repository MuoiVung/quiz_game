import { Button, Stack, Typography } from "@mui/material";
import FormModal from "../FormModal";
import { ConfirmModalProps } from "./types";

const ConfirmModal = ({
  isLoading = false,
  title,
  onCloseModal,
  open,
  onConfirm,
  content = "Are you sure want to delete?",
  firstBtnName = "Delete",
  secondBtnName = "Cancel",
}: ConfirmModalProps) => {
  return (
    <FormModal
      isLoading={isLoading}
      title={title}
      onClose={onCloseModal}
      open={open}
    >
      <Typography textAlign="center">{content}</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        mt="16px"
        spacing={2}
      >
        <Button
          size="large"
          color="success"
          variant="outlined"
          onClick={onConfirm}
        >
          {firstBtnName}
        </Button>
        <Button
          onClick={onCloseModal}
          size="large"
          color="error"
          variant="outlined"
        >
          {secondBtnName}
        </Button>
      </Stack>
    </FormModal>
  );
};

export default ConfirmModal;
