import { createTheme } from "@mui/system";
import COLORS from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.YELLOW,
    },
  },
});

export default theme;
