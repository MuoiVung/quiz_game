import { Backdrop, CircularProgress } from "@mui/material";
import { memo } from "react";
import { CircularSpinnerProps } from "./types";

const CircularSpinner = ({ isLoading }: CircularSpinnerProps) => {
  return (
    <Backdrop
      open={isLoading}
      sx={{
        zIndex: 999,
        backgroundColor: "rgba(0,0,0,0.1)",
      }}
    >
      <CircularProgress color="primary" />
    </Backdrop>
  );
};

export default memo(CircularSpinner);
