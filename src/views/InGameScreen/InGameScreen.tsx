import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import { useSubmitQuestionsMutation } from "../../api/QuestionsAPI";
import {
  GetPlayQuestionData,
  ListQuestionChecked,
  QuestionSubmitted,
} from "../../api/QuestionsAPI/types";
import ConfirmModal from "../../components/ConfirmModal";
import ErrorScreen from "../../components/ErrorScreen";
import Review from "../../components/Review";
import { SESSION_KEY } from "../../constants/storage";
import {
  sessionDecryptData,
  sessionEncryptData,
} from "../../utils/lsCryptoJS.util";
import { ThumbnailImage } from "./styles";
import { IngameDataType } from "./types";

function InGameScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [submittedQuestions, setSubmittedQuetions] = useState<
    QuestionSubmitted[]
  >([]);

  const [currentReviewQuestions, setCurrentReviewQuestions] = useState<
    ListQuestionChecked[]
  >([]);

  const [isSomethingLoading, setIsSomethingLoading] = useState(true);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [
    submitQuestions,
    { data: submitResponseData, isLoading: isSubmitQuestionLoading },
  ] = useSubmitQuestionsMutation();

  const { state } = useLocation();

  const questionData: GetPlayQuestionData[] = state?.questionData;

  useEffect(() => {
    const handleUnload = () => {
      const ingameData: IngameDataType = {
        currentQuestion,
        submittedQuestions,
        currentReviewQuestions,
      };
      sessionEncryptData(SESSION_KEY.INGAME_DATA, ingameData);
    };

    const unsubscribe = window.addEventListener("beforeunload", handleUnload);

    return unsubscribe;
  }, [submittedQuestions, currentQuestion, currentReviewQuestions]);

  useEffect(() => {
    const ingameData: IngameDataType = sessionDecryptData(
      SESSION_KEY.INGAME_DATA
    );

    if (ingameData) {
      setSubmittedQuetions(ingameData.submittedQuestions);
      setCurrentQuestion(ingameData.currentQuestion);
      setCurrentReviewQuestions(ingameData.currentReviewQuestions);
    }
    setIsSomethingLoading(false);
  }, []);

  useEffect(() => {
    if (submitResponseData?.data?.listQuestionChecked) {
      setCurrentReviewQuestions(submitResponseData.data.listQuestionChecked);
    }
  }, [submitResponseData?.data.listQuestionChecked]);

  if (!questionData) {
    return <ErrorScreen />;
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

  const handleSubmitQuestions = async () => {
    try {
      await submitQuestions({
        listQuestionSubmitted: submittedQuestions,
      }).unwrap();
      setIsConfirmModalOpen(false);
      setCurrentQuestion((curr) => curr + 1);
    } catch (error) {
      toast.error("Something went wrong! Please try again later!");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion === questionData.length - 1) {
      setIsConfirmModalOpen(true);
    } else {
      setCurrentQuestion((curr) => curr + 1);
    }
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
                  <Tooltip title={option.content}>
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
                  </Tooltip>
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
        currentReviewQuestions && <Review result={currentReviewQuestions} />
      )}
      <ConfirmModal
        title="Submit Answers"
        content="Are you sure want to submit answers?"
        firstBtnName="Submit"
        open={isConfirmModalOpen}
        onCloseModal={() => setIsConfirmModalOpen(false)}
        onConfirm={handleSubmitQuestions}
        isLoading={isSubmitQuestionLoading}
      />
    </Box>
  );
}

export default InGameScreen;
