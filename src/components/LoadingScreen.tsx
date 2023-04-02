import { Backdrop, CircularProgress, Typography } from "@mui/material";
import COLORS from "../constants/colors";

function LoadingScreen() {
  return (
    <>
      <Backdrop
        open={true}
        sx={{
          zIndex: 9999,
          color: COLORS.YELLOW,
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <CircularProgress color="inherit" />
        <Typography variant="h5" sx={{ ml: "12px", color: "primary" }}>
          Wait a minute...
        </Typography>
      </Backdrop>
      <CircularProgress style={{ display: "none" }} />
    </>
  );
}

export default LoadingScreen;
