import { createTheme } from "@mui/material/styles";
import COLORS from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.YELLOW,
    },
    background: {
      default: COLORS.WHITE,
    },
  },
});

export default theme;
