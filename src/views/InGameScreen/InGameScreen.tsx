import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useSubmitQuestionsMutation } from "../../api/QuestionsAPI";
import {
  GetPlayQuestionData,
  QuestionSubmitted,
} from "../../api/QuestionsAPI/types";
import LoadingScreen from "../../components/LoadingScreen";
import COLORS from "../../constants/colors";
import { SESSION_KEY } from "../../constants/storage";
import {
  sessionDecryptData,
  sessionEncryptData,
} from "../../utils/lsCryptoJS.util";
import ResultTable from "./ResultTable";
import { ThumbnailImage } from "./styles";
import { IngameDataType } from "./types";
import Review from "../../components/Review";

function InGameScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [submittedQuestions, setSubmittedQuetions] = useState<
    QuestionSubmitted[]
  >([]);

  const [isSomethingLoading, setIsSomethingLoading] = useState(true);

  const [
    submitQuestions,
    { data: submitResponseData, isLoading: isSubmitQuestionLoading },
  ] = useSubmitQuestionsMutation();

  const { state } = useLocation();

  const questionData: GetPlayQuestionData[] = state.questionData;

  useEffect(() => {
    const handleUnload = () => {
      const ingameData: IngameDataType = {
        currentQuestion,
        submittedQuestions,
      };
      sessionEncryptData(SESSION_KEY.INGAME_DATA, ingameData);
    };

    const unsubscribe = window.addEventListener("beforeunload", handleUnload);

    return unsubscribe;
  }, [submittedQuestions, currentQuestion]);

  useEffect(() => {
    const ingameData: IngameDataType = sessionDecryptData(
      SESSION_KEY.INGAME_DATA
    );

    if (ingameData) {
      setSubmittedQuetions(ingameData.submittedQuestions);
      setCurrentQuestion(ingameData.currentQuestion);
    }
    setIsSomethingLoading(false);
  }, []);

  if (isSubmitQuestionLoading || isSomethingLoading) {
    return <LoadingScreen />;
  }

  if (!questionData) {
    return (
      <Box>
        <Typography>Sorry! No Questions. Please wait!</Typography>
      </Box>
    );
  }

  const handleOptionSelect = (optionId: number) => {
    const newSubmittedQuestions = [...submittedQuestions];

    const isOptionSelected = submittedQuestions[
      currentQuestion
    ]?.answersSubmittedId.findIndex((answerId) => answerId === optionId);

    if (isOptionSelected > -1) {
      newSubmittedQuestions[currentQuestion].answersSubmittedId =
        newSubmittedQuestions[currentQuestion].answersSubmittedId.filter(
          (answerId) => answerId !== optionId
        );

      setSubmittedQuetions(newSubmittedQuestions);

      return;
    }

    if (!newSubmittedQuestions[currentQuestion]?.answersSubmittedId) {
      const answeredQuestion: QuestionSubmitted = {
        answersSubmittedId: [],
        id: questionData[currentQuestion].id,
      };

      answeredQuestion.answersSubmittedId.push(optionId);
      newSubmittedQuestions[currentQuestion] = answeredQuestion;
    } else {
      newSubmittedQuestions[currentQuestion].answersSubmittedId.push(optionId);
    }

    setSubmittedQuetions(newSubmittedQuestions);
  };

  const handleNextQuestion = () => {
    if (currentQuestion === questionData.length - 1) {
      submitQuestions({ listQuestionSubmitted: submittedQuestions });
    }
    setCurrentQuestion((curr) => curr + 1);
  };

  const handleBackQuestion = () => {
    setCurrentQuestion((curr) => curr - 1);
  };

  return (
    <Box sx={{ p: 2 }}>
      {currentQuestion < questionData.length ? (
        <Card>
          <CardHeader title={`Question ${currentQuestion + 1}`} />
          <CardContent>
            {questionData[currentQuestion].thumbnail_link && (
              <Box display="flex" justifyContent="center" mb="16px">
                <ThumbnailImage
                  src={questionData[currentQuestion].thumbnail_link}
                  alt="question"
                />
              </Box>
            )}
            <Typography variant="h6">
              {questionData[currentQuestion].title}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {questionData[currentQuestion].answers.map((option) => (
                <Grid item xs={12} sm={6} key={option.id}>
                  <Button
                    variant={
                      submittedQuestions[
                        currentQuestion
                      ]?.answersSubmittedId.includes(option.id)
                        ? "contained"
                        : "outlined"
                    }
                    fullWidth
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    {option.content.length > 30
                      ? option.content.slice(0, 30) + "..."
                      : option.content}
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
              disabled={
                !submittedQuestions[currentQuestion] ||
                submittedQuestions[currentQuestion]?.answersSubmittedId
                  .length === 0
              }
              sx={{ minWidth: "120px" }}
            >
              {currentQuestion === questionData.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </Card>
      ) : (
        //  : (
        //   <Box
        //     sx={{
        //       display: "flex",
        //       alignItems: "center",
        //       justifyContent: "center",
        //     }}
        //   >
        //     <Box>
        //       <Typography variant="h4">Quiz Complete!</Typography>
        //       {submitResponseData && <ResultTable data={submitResponseData} />}
        //       <Button
        //         variant="contained"
        //         fullWidth
        //         sx={{ mt: "16px", zIndex: 999, color: COLORS.WHITE }}
        //         component={Link}
        //         to="/play"
        //       >
        //         Play Again
        //       </Button>
        //     </Box>
        //   </Box>
        // )
        submitResponseData && <Review result={submitResponseData} />
      )}
    </Box>
  );
}

export default InGameScreen;
