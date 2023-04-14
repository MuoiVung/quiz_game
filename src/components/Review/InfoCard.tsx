import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { InfoCardProps } from "./types";
import COLORS from "../../constants/colors";
import { IconContainer, StyledCardContent } from "./styles";

const InfoCard = ({ title, content, icon, color }: InfoCardProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card variant="outlined">
      <StyledCardContent>
        <Stack
          direction={{ md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          minWidth={{ md: 150 }}
        >
          {matches && (
            <>
              <Box>
                <Typography fontSize={12} color={COLORS.GRAY_700}>
                  {title}
                </Typography>
                <Typography>{content}</Typography>
              </Box>
              <IconContainer color={color}>{icon}</IconContainer>
            </>
          )}
          {!matches && (
            <>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <IconContainer color={color}>{icon}</IconContainer>
                <Typography>{content}</Typography>
              </Stack>

              <Typography fontSize={12} color={COLORS.GRAY_700}>
                {title}
              </Typography>
            </>
          )}
        </Stack>
      </StyledCardContent>
    </Card>
  );
};

export default InfoCard;
