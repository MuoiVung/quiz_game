import { Button, Container, Stack, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";

const ErrorScreenContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",

  "& .title": {
    fontWeight: "700",
    fontSize: "8rem",
  },

  "& .subTitle": {
    fontWeight: "500",
    fontSize: "1.5rem",
  },

  "& .backHomeBtn": {
    marginTop: "1.75rem",
    color: theme.palette.common.WHITE,
  },
}));

const ErrorScreen = () => {
  return (
    <ErrorScreenContainer>
      <Typography className="title" color="primary">
        404
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center" mb="0.5rem">
        <WarningOutlinedIcon />
        <Typography className="subTitle">Oops! Page not found!</Typography>
      </Stack>
      <Typography>The page you requested was not found.</Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        className="backHomeBtn"
        size="large"
      >
        Back to Home
      </Button>
    </ErrorScreenContainer>
  );
};

export default ErrorScreen;
