import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import { useMemo } from "react";
import { Link } from "react-router-dom";
import COLORS from "../../constants/colors";
import ReviewCard from "../ReviewCard/ReviewCard";
import InfoCard from "./InfoCard";
import { ReviewAnswer, ReviewProps, ReviewQuestionType } from "./types";

const Review = ({ result }: ReviewProps) => {
  const correctAnswers = result.filter(
    (question) => question.numberSubmitCorrect === question.numberAnswersCorrect
  );

  const incorrectAnswers = result.filter(
    (question) => question.numberSubmitCorrect !== question.numberAnswersCorrect
  );

  const transformedData = useMemo(
    () =>
      result.map((question) => {
        const transformedAnswers: ReviewAnswer[] = question.answers.map(
          (answer) => {
            const transformedAnswer: ReviewAnswer = {
              id: answer.id,
              content: answer.content,
              status: "unselected",
            };

            if (answer.is_submit_correct) {
              transformedAnswer.status = "true";
            }
            if (
              !answer.is_correct &&
              answer.hasOwnProperty("is_submit_correct")
            ) {
              transformedAnswer.status = "fail";
            }
            if (answer.is_correct && !answer.is_submit_correct) {
              transformedAnswer.status = "true-unselected";
            }

            return transformedAnswer;
          }
        );

        const reviewQuestion: ReviewQuestionType = {
          id: question.id,
          isCorrect:
            question.numberAnswersCorrect === question.numberSubmitCorrect,
          point:
            question.numberAnswersCorrect === question.numberSubmitCorrect
              ? +question.scoreThisQuestion.toFixed(0)
              : 0,
          question: question.title,
          answers: transformedAnswers,
        };

        return reviewQuestion;
      }),
    [result]
  );

  const totalScore = useMemo(
    () =>
      result.reduce(
        (total, curr) =>
          total + curr.numberSubmitCorrect === curr.numberAnswersCorrect
            ? curr.scoreThisQuestion
            : 0,
        0
      ),
    [result]
  );

  return (
    <Container maxWidth="md">
      <Typography variant="h3" color="primary" textAlign="center" mb="24px">
        Summary
      </Typography>
      <Stack display="flex" alignItems="center" mb="24px">
        <Button component={Link} to="/play" variant="outlined" size="large">
          Play Again
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center">
        <InfoCard
          color={COLORS.YELLOW}
          content={totalScore.toFixed(0)}
          icon={<MonetizationOnIcon />}
          title="Score"
        />
        <InfoCard
          color={COLORS.GREEN_BORDER}
          content={correctAnswers.length.toString()}
          icon={<CheckIcon />}
          title="Correct"
        />
        <InfoCard
          color={COLORS.RED_BORDER}
          content={incorrectAnswers.length.toString()}
          icon={<CloseIcon />}
          title="Incorrect"
        />
      </Stack>
      {/* REVIEW TABLE */}
      <Card
        variant="outlined"
        sx={{
          mt: "24px",
          backgroundColor: COLORS.YELLOW_BACKGROUND,
        }}
      >
        <CardContent>
          <Box textAlign="center" mb="16px">
            <Typography fontSize={24}>Review Questions</Typography>
          </Box>
          <Stack
            spacing={{
              md: 4,
              xs: 1,
            }}
            direction={{
              md: "row",
            }}
            mb="24px"
            mt="8px"
            justifyContent="center"
          >
            <Stack direction="row" spacing={0.5} alignItems="center">
              <CancelIcon color="error" />:
              <Typography>Incorrect answer</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <CheckCircleIcon color="success" />:
              <Typography>Correct answer</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <CheckCircleIcon color="disabled" />:
              <Typography>Unselected correct answer</Typography>
            </Stack>
          </Stack>

          {/*  Review Card List */}
          <Stack spacing={2}>
            {transformedData.map((reviewQuestion, index) => (
              <ReviewCard
                key={reviewQuestion.id}
                seq={index + 1}
                question={reviewQuestion.question}
                answers={reviewQuestion.answers}
                isCorrect={reviewQuestion.isCorrect}
                point={reviewQuestion.point}
              />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Review;
