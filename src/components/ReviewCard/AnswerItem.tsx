import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Stack, Typography } from "@mui/material";
import { AnswerItemProps } from "./types";

const AnswerItem = ({ status, content }: AnswerItemProps) => {
  return (
    <Stack direction="row" spacing={1}>
      {/* Icon */}
      {status === "fail" && <CancelIcon color="error" />}
      {status === "true" && <CheckCircleIcon color="success" />}
      {status === "unselected" && <CircleOutlinedIcon color="disabled" />}
      {status === "true-unselected" && <CheckCircleIcon color="disabled" />}

      <Typography
        maxWidth={{
          md: 700,
          sm: 500,
          xs: 200,
        }}
        noWrap
      >
        {content}
      </Typography>
    </Stack>
  );
};

export default AnswerItem;
