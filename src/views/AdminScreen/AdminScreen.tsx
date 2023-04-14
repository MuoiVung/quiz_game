import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import COLORS from "../../constants/colors";

const AdminScreen = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="75vh"
    >
      <Box display="flex" flexDirection="column">
        <Button
          component={Link}
          size="large"
          sx={{
            my: "24px",
            color: COLORS.WHITE,
          }}
          variant="contained"
          to="/play"
        >
          Play
        </Button>
        <Button
          size="large"
          component={Link}
          to="/management"
          variant="contained"
          sx={{
            color: COLORS.WHITE,
          }}
        >
          Management
        </Button>
      </Box>
    </Box>
  );
};

export default AdminScreen;
