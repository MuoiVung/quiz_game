import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SelectPlayQuestionsDataType>({
    resolver: yupResolver(validateSchema),
  });

  const navigate = useNavigate();

  const handleStartGame = (data: SelectPlayQuestionsDataType) => {
    reset();
    // move to start game screen
    navigate(`/play/${data.total}`, { replace: true });
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
      </Box>
    </Container>
  );
};

export default PlayScreen;
