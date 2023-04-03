import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UnauthorizedScreen = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Box component="section">
      <h1>Unauthorized</h1>
      <br />
      <p>You do not have access to the requested page.</p>
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-end"
      >
        <button onClick={goBack}>Go Back</button>
      </Box>
    </Box>
  );
};

export default UnauthorizedScreen;
