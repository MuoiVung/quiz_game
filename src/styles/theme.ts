import { createTheme } from "@mui/material/styles";
import COLORS from "../constants/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.YELLOW,
    },
    background: {
      default: COLORS.WHITE,
    },
    success: {
      main: "rgb(0, 201, 133)",
    },
    error: {
      main: "#ef3c69",
    },

    common: {
      YELLOW_100: "#fef4d3",
      YELLOW_200: "#fee9a7",
      YELLOW_300: "#fdde7a",
      YELLOW_400: "#fdd34e",
      YELLOW: "#fcc822",
      YELLOW_600: "#caa01b",
      YELLOW_700: "#977814",
      YELLOW_800: "#65500e",
      YELLOW_900: "#322807",
      BLACK: "#333333",
      BLACK_400: "#00000099",
      WHITE: "#ffffff",
      GRAY: "#d1d1d1",
      GRAY_700: "#A8A8A8",
      GRAY_100: "#fafafa",
      PURPlE: "#461A42",
      BLUE: "#2F6DAE",
      OCEAN: "#2C9CA6",
      RED: "#D4546A",
    },
  },
});

export default theme;
