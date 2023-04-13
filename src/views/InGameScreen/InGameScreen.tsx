import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetPlayQuestionsQuery,
  useSubmitQuestionsMutation,
} from "../../api/QuestionsAPI";
import {
  ListQuestionSubmitted,
  SubmitQuestionsRequest,
} from "../../api/QuestionsAPI/types";
import LoadingScreen from "../../components/LoadingScreen";
import COLORS from "../../constants/colors";
import ResultTable from "./ResultTable";
import { ThumbnailImage } from "./styles";

const defaultSubmitQuestionsRequest: SubmitQuestionsRequest = {
  listQuestionSubmitted: [],
};

function InGameScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const [submittedQuestions, setSubmittedQuetions] =
    useState<SubmitQuestionsRequest>(defaultSubmitQuestionsRequest);
  const { totalQuestions } = useParams<{ totalQuestions: string }>();
  const { data, isLoading } = useGetPlayQuestionsQuery({
    total: totalQuestions || "",
  });
  const [
    submitQuestions,
    { data: submitResponseData, isLoading: isSubmitQuestionLoading },
  ] = useSubmitQuestionsMutation();

  const questions = data?.data;

  if (isLoading || isSubmitQuestionLoading) {
    return <LoadingScreen />;
  }

  if (!questions) {
    return (
      <Box>
        <Typography>Sorry! No Questions. Please wait!</Typography>
      </Box>
    );
  }

  const handleOptionSelect = (optionId: number) => {
    const isOptionSelected = selectedOptions.findIndex(
      (option) => option === optionId
    );

    if (isOptionSelected > -1) {
      setSelectedOptions((prevOptions) =>
        prevOptions.filter((opId) => opId !== optionId)
      );

      return;
    }

    setSelectedOptions((prevOptions) => [...prevOptions, optionId]);
  };

  const handleNextQuestion = () => {
    if (
      submittedQuestions?.listQuestionSubmitted[currentQuestion + 1]
        ?.answersSubmittedId[0]
    ) {
      setSelectedOptions(
        submittedQuestions.listQuestionSubmitted[currentQuestion + 1]
          .answersSubmittedId
      );
    }
    if (selectedOptions.length === 0) {
      return;
    }
    const answeredQuestion: ListQuestionSubmitted = {
      id: questions[currentQuestion].id,
      answersSubmittedId: selectedOptions,
    };
    if (currentQuestion === questions.length - 1) {
      submitQuestions({
        listQuestionSubmitted: [
          ...submittedQuestions.listQuestionSubmitted,
          answeredQuestion,
        ],
      });
    } else {
      setSubmittedQuetions((curr) => ({
        listQuestionSubmitted: [
          ...curr.listQuestionSubmitted,
          answeredQuestion,
        ],
      }));
    }
    setCurrentQuestion((curr) => curr + 1);
  };

  const handleBackQuestion = () => {
    setCurrentQuestion((curr) => curr - 1);
    setSelectedOptions(
      submittedQuestions.listQuestionSubmitted[currentQuestion - 1]
        .answersSubmittedId
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      {currentQuestion < questions.length ? (
        <Card>
          <CardHeader title={`Question ${currentQuestion + 1}`} />
          <CardContent>
            {questions[currentQuestion].thumbnail_link && (
              <Box display="flex" justifyContent="center" mb="16px">
                <ThumbnailImage
                  src={questions[currentQuestion].thumbnail_link}
                  alt="question"
                />
              </Box>
            )}
            <Typography variant="h6">
              {questions[currentQuestion].title}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {questions[currentQuestion].answers.map((option) => (
                <Grid item xs={12} sm={6} key={option.id}>
                  <Button
                    variant={
                      selectedOptions.includes(option.id)
                        ? "contained"
                        : "outlined"
                    }
                    fullWidth
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    {option.content}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <Box sx={{ p: 2 }} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              onClick={handleBackQuestion}
              disabled={currentQuestion === 0}
              sx={{ minWidth: "120px" }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              disabled={selectedOptions.length === 0}
              sx={{ minWidth: "120px" }}
            >
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Card>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography variant="h4">Quiz Complete!</Typography>
            {data && <ResultTable data={submitResponseData} />}
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: "16px", zIndex: 999, color: COLORS.WHITE }}
              component={Link}
              to="/play"
            >
              Play Again
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default InGameScreen;
