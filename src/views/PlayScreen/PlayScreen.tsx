import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useState } from "react";
import { toast } from "react-toastify";
import { questionsApiSlice } from "../../api/QuestionsAPI";
import CircularSpinner from "../../components/CircularSpinner";
import COLORS from "../../constants/colors";
import store from "../../store/store";
import { SelectPlayQuestionsDataType } from "./types";
import { SESSION_KEY } from "../../constants/storage";

const validateSchema = yup
  .object({
    total: yup.number().required("Number is required"),
  })
  .required();

const PlayScreen = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SelectPlayQuestionsDataType>({
    resolver: yupResolver(validateSchema),
  });

  const [isGetPlayQuestionsLoading, setIsGetPlayQuestionsLoading] =
    useState(false);

  const navigate = useNavigate();

  const handleStartGame = async (data: SelectPlayQuestionsDataType) => {
    // clear save game data before starting a new game
    sessionStorage.removeItem(SESSION_KEY.INGAME_DATA);

    try {
      setIsGetPlayQuestionsLoading(true);
      const result = await store
        .dispatch(
          questionsApiSlice.endpoints.getPlayQuestions.initiate(
            {
              total: data.total.toString(),
            },
            { forceRefetch: true }
          )
        )
        .unwrap();

      const questionData = result.data;

      if (!questionData || questionData?.length === 0) {
        toast.warning("Sorry, there is no question. Please play again later!");
        return;
      }

      reset();
      navigate(`/play/${data.total}`, {
        replace: true,
        state: { questionData },
      });
    } catch (error) {
      toast.error(
        "Failed to load questions for playing! Please try again later"
      );
    } finally {
      setIsGetPlayQuestionsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box my={6} textAlign="center">
        <Typography
          component="h2"
          fontFamily="Poppins"
          color="primary"
          sx={{
            fontSize: {
              md: "96px",
              xs: "42px",
            },
          }}
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
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, color: COLORS.WHITE, py: "12px" }}
            fullWidth
          >
            Play
          </Button>
        </Box>
      </Box>
      {/* FORM */}
      <CircularSpinner isLoading={isGetPlayQuestionsLoading} />
    </Box>
  );
};

export default PlayScreen;
