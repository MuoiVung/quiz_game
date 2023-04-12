import { Button, Stack } from "@mui/material";
import { SubmitFormBtn } from "./styles";
import { FormModalButtonProps } from "./types";

const FormModalButton = ({ loading, onCloseModal }: FormModalButtonProps) => {
  return (
    <Stack
      direction={{ md: "row" }}
      justifyContent={{ md: "flex-end" }}
      spacing={2}
      my={2}
    >
      <SubmitFormBtn loading={loading} type="submit" variant="contained">
        Save
      </SubmitFormBtn>

      <Button
        color="error"
        variant="contained"
        onClick={onCloseModal}
        sx={{ color: "common.WHITE" }}
      >
        Cancel
      </Button>
    </Stack>
  );
};

export default FormModalButton;
