import { Button, Stack, Typography } from "@mui/material";
import FormModal from "../FormModal";
import { DeleteModalProps } from "./types";

const DeleteModal = ({
  isLoading,
  title,
  onCloseModal,
  open,
  onConfirmDelete,
}: DeleteModalProps) => {
  return (
    <FormModal
      isLoading={isLoading}
      title={title}
      onClose={onCloseModal}
      open={open}
    >
      <Typography textAlign="center">Are you sure want to delete?</Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        mt="16px"
        spacing={2}
      >
        <Button
          size="large"
          color="error"
          variant="outlined"
          onClick={onConfirmDelete}
        >
          Delete
        </Button>
        <Button
          onClick={onCloseModal}
          size="large"
          color="success"
          variant="outlined"
        >
          Cancel
        </Button>
      </Stack>
    </FormModal>
  );
};

export default DeleteModal;
