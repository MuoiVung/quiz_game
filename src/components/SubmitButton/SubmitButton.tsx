import { StyledSubmitButton } from "./styles";
import { SubmitButtonProps } from "./types";

const SubmitButton = ({ loading, content }: SubmitButtonProps) => {
  return (
    <StyledSubmitButton
      loading={loading}
      type="submit"
      fullWidth
      variant="contained"
    >
      {content}
    </StyledSubmitButton>
  );
};

export default SubmitButton;
