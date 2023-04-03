import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

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
          sx={{
            my: "24px",
          }}
          variant="contained"
          to="/play"
        >
          Play
        </Button>
        <Button component={Link} to="/management" variant="contained">
          Manage Questions
        </Button>
      </Box>
    </Box>
  );
};

export default AdminScreen;
