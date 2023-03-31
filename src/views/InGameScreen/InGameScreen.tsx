// import {
//   Box,
//   Container,
//   Grid,
//   List,
//   ListItem,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { useGetPlayQuestionsQuery } from "../../api/QuestionsAPI";
// import LoadingScreen from "../../components/LoadingScreen";
// import QuestionScreen from "../../components/QuestionScreen";
// import COLORS from "../../constants/colors";
// import AnswerItem from "./AnswerItem";

// const InGameScreen = () => {
//   const { totalQuestions } = useParams<{ totalQuestions: string }>();
//   const { data: playQuestions, isLoading } = useGetPlayQuestionsQuery({
//     total: totalQuestions || "",
//   });

//   const [currentQuestion, setCurrentQuestion] = useState(0);

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <Box component="main">
//       {/* START: QUESTION */}
//       <Box
//         height={200}
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           backgroundColor: COLORS.YELLOW,
//           alignItems: "center",
//         }}
//       >
//         <Typography fontSize={32} color={COLORS.WHITE}>
//           {playQuestions?.data[currentQuestion].title}
//         </Typography>
//       </Box>
//       {/* END: QUESTION */}
//       {/* START: ANSWER */}
//       <Box sx={{ py: "24px", px: "48px" }}>
//         <Box sx={{ display: "flex" }}>
//           <AnswerItem>
//             {playQuestions?.data[currentQuestion].answers[0].content}
//           </AnswerItem>
//           <AnswerItem>
//             {playQuestions?.data[currentQuestion].answers[1].content}
//           </AnswerItem>
//           <AnswerItem>
//             {playQuestions?.data[currentQuestion].answers[2].content}
//           </AnswerItem>
//           <AnswerItem>
//             {playQuestions?.data[currentQuestion].answers[3].content}
//           </AnswerItem>
//         </Box>
//         {/* END: ANSWER*/}
//         {/* START: BUTTON PANEL*/}
//         {/* END: BUTTON PANEL */}
//       </Box>
//       <QuestionScreen />
//     </Box>
//   );
// };

// export default InGameScreen;

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

const defaultSubmitQuestionsRequest: SubmitQuestionsRequest = {
  listQuestionSubmitted: [],
};

function InGameScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<null | number>(null);
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
    setSelectedOption(optionId);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      return;
    }

    const answeredQuestion: ListQuestionSubmitted = {
      id: questions[currentQuestion].id,
      answersSubmittedId: [selectedOption],
    };
    if (currentQuestion === questions.length - 1) {
      submitQuestions(submittedQuestions);
    } else {
      setSubmittedQuetions((curr) => ({
        listQuestionSubmitted: [
          ...curr.listQuestionSubmitted,
          answeredQuestion,
        ],
      }));
    }

    setSelectedOption(null);
    setCurrentQuestion((curr) => curr + 1);
  };

  const handleBackQuestion = () => {
    setCurrentQuestion((curr) => curr - 1);
  };

  return (
    <Box sx={{ p: 2 }}>
      {currentQuestion < questions.length ? (
        <Card>
          <CardHeader title={`Question ${currentQuestion + 1}`} />
          <CardContent>
            {questions[currentQuestion].thumbnail_link && (
              <Box display="flex" justifyContent="center" mb="16px">
                <img
                  src={questions[currentQuestion].thumbnail_link}
                  style={{
                    height: "200px",
                    width: "auto",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
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
                      selectedOption === option.id ? "contained" : "outlined"
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
              disabled={selectedOption === null}
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
            height: "50vh",
          }}
        >
          <Box>
            <Typography variant="h4">Quiz Complete!</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Your score is {submitResponseData?.data.totalScore}.
            </Typography>
            <Button variant="contained" fullWidth sx={{ mt: "16px" }}>
              <Link
                to="/play"
                replace
                style={{
                  textDecoration: "none",
                  color: COLORS.WHITE,
                }}
              >
                Play Again
              </Link>
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default InGameScreen;
