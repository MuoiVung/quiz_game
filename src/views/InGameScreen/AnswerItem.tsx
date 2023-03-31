import { Box, Button, Typography } from "@mui/material";
import COLORS from "../../constants/colors";
import { AnswerItemProps } from "./types";

const AnswerItem = ({ children }: AnswerItemProps) => {
  return (
    <Button
      variant="contained"
      sx={{
        p: "12px",
        flex: 1,
        mx: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100px",
        position: "relative",
        color: COLORS.WHITE,
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
        }}
      >
        A
      </Typography>
      <Typography>{children}</Typography>
    </Button>
  );
};

export default AnswerItem;
