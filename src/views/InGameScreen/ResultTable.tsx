import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ResultTableProps } from "./types";

const ResultTable = ({ data }: ResultTableProps) => {
  if (!data) {
    return <div>No result</div>;
  }

  const { answers, totalScore } = data;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="answers table">
        <TableHead>
          <TableRow>
            <TableCell align="center">STT</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Answers</TableCell>
            <TableCell>Correct Answers</TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {answers.map((answer, index) => (
            <TableRow key={index}>
              <TableCell align="center">
                <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  {index + 1}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                  {answer.question}
                </Typography>
              </TableCell>
              <TableCell>
                {answer.answers.map((answer, index) => (
                  <Box key={index}>
                    <Typography sx={{ fontSize: "1rem" }}>{answer}</Typography>
                  </Box>
                ))}
              </TableCell>
              <TableCell>
                {answer.correctAnswers.map((answer, index) => (
                  <Box key={index}>
                    <Typography sx={{ fontSize: "1rem", color: "green" }}>
                      {answer}
                    </Typography>
                  </Box>
                ))}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                Total Score: {totalScore}
              </Typography>
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ResultTable;
