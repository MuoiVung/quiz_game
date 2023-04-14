import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Card, CardContent, Container, Stack, Typography } from "@mui/material";

import InfoCard from "./InfoCard";
import { ReviewProps } from "./types";
import COLORS from "../../constants/colors";

const Review = ({ result }: ReviewProps) => {
  return (
    <Container maxWidth="md">
      <Typography variant="h3" color="primary" textAlign="center" mb="24px">
        Summary
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <InfoCard
          color={COLORS.YELLOW}
          content={result.data.totalScore.toString()}
          icon={<MonetizationOnIcon />}
          title="Score"
        />
        <InfoCard
          color="success.main"
          content="3"
          icon={<CheckIcon />}
          title="Correct"
        />
        <InfoCard
          color="error.main"
          content="5"
          icon={<CloseIcon />}
          title="Incorrect"
        />
      </Stack>
      <Card
        variant="outlined"
        sx={{
          mt: "24px",
        }}
      >
        <CardContent>
          <Typography>Review Questions</Typography>
          <Typography fontSize={12} color="common.GRAY_700">
            Click on the question to see answers
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Review;
