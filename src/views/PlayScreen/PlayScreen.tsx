import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useGetPlayQuestionsQuery } from "../../api/QuestionsAPI";
import COLORS from "../../constants/colors";
import { SelectPlayQuestionsDataType } from "./types";

const defaultForgotPasswordValue: SelectPlayQuestionsDataType = {
  total: 0,
};

const validateSchema = yup
  .object({
    total: yup.number().required("Number is required"),
  })
  .required();

const PlayScreen = () => {
  const { data: playQuestions, isLoading } = useGetPlayQuestionsQuery({
    total: 0,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SelectPlayQuestionsDataType>({
    resolver: yupResolver(validateSchema),
  });

  const navigate = useNavigate();
  console.log(playQuestions);

  const handleStartGame = (data: SelectPlayQuestionsDataType) => {
    // move to start game screen
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box my={6} textAlign="center">
          <Typography
            component="h2"
            variant="h1"
            fontFamily="Poppins"
            color="primary"
          >
            Let's Play
          </Typography>
        </Box>
        {/* FORM */}
        <Box component="form" onSubmit={handleSubmit(handleStartGame)}>
          <TextField
            required
            {...register("total")}
            error={errors.total ? true : false}
            name="total"
            label="Total Questions"
            autoFocus
            margin="normal"
            autoComplete="true"
            type="number"
          />
          <Box>
            <LoadingButton
              loading={isLoading}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, color: COLORS.WHITE, py: "12px" }}
              fullWidth
            >
              Play
            </LoadingButton>
          </Box>
        </Box>
        {/* FORM */}
      </Box>
    </Container>
  );
};

export default PlayScreen;
