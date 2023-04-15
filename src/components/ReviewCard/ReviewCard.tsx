import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import COLORS from "../../constants/colors";
import AnswerItem from "./AnswerItem";
import { ReviewCardProps } from "./types";

const ReviewCard = ({
  answers,
  isCorrect,
  point,
  question,
  seq,
}: ReviewCardProps) => {
  return (
    <Card variant="outlined" sx={{ minHeight: "100px", display: "flex" }}>
      <Box
        sx={{
          backgroundColor: isCorrect ? COLORS.GREEN_BORDER : COLORS.RED_BORDER,
        }}
        width="8px"
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography
          maxWidth={{
            md: 700,
            sm: 500,
            xs: 200,
          }}
          noWrap
          fontSize={18}
          fontWeight={500}
        >
          {seq}. {question}
        </Typography>
        <Divider
          sx={{
            mt: "12px",
            mb: "24px",
          }}
        />
        <Stack spacing={2}>
          {answers.map((answer) => (
            <AnswerItem
              key={answer.id}
              status={answer.status}
              content={answer.content}
            />
          ))}
        </Stack>
        <Divider
          sx={{
            my: "24px",
          }}
        />
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography fontSize={18} fontWeight={500}>
            Score:{" "}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            justifyContent="flex-end"
          >
            <Typography>
              {isCorrect && "+"}
              {point}
            </Typography>
            <MonetizationOnIcon color="primary" />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
