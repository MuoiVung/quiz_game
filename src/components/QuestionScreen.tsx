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

function QuestionScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Paris", "Madrid", "Rome", "Berlin"],
      answerIndex: 0,
    },
    {
      id: 2,
      question: "What is the highest mountain in the world?",
      options: ["Everest", "Kilimanjaro", "Denali", "Aconcagua"],
      answerIndex: 0,
    },
    // Add more questions here
  ];

  const handleOptionSelect = (index: any) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      const currentAnswerIndex = questions[currentQuestion].answerIndex;
      if (selectedOption === currentAnswerIndex) {
        setScore(score + 1);
      }
      setSelectedOption(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      {currentQuestion < questions.length ? (
        <Card>
          <CardHeader title={`Question ${currentQuestion + 1}`} />
          <CardContent>
            <Typography variant="h6">
              {questions[currentQuestion].question}
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {questions[currentQuestion].options.map((option, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Button
                    variant={
                      selectedOption === index ? "contained" : "outlined"
                    }
                    fullWidth
                    onClick={() => handleOptionSelect(index)}
                  >
                    {option}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <Box sx={{ p: 2 }}>
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              {currentQuestion === questions.length - 1
                ? "Finish"
                : "Next Question"}
            </Button>
          </Box>
        </Card>
      ) : (
        <Box>
          <Typography variant="h4">Quiz Complete!</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Your score is {score} out of {questions.length}.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default QuestionScreen;
