import React from "react";
import { ButtonContainer, ButtonItem } from "./styles";
import { Typography } from "@mui/material";
import { AuthButtonContainerProps } from "./types";

const AuthButtonContainer = ({
  btnLeftUrl,
  btnLeftContent,
  btnRightUrl,
  btnRightContent,
}: AuthButtonContainerProps) => {
  return (
    <ButtonContainer
      direction={{ lg: "row" }}
      justifyContent={{ lg: "space-between" }}
    >
      <ButtonItem to={btnLeftUrl}>
        <Typography>{btnLeftContent}</Typography>
      </ButtonItem>

      <ButtonItem to={btnRightUrl}>
        <Typography>{btnRightContent}</Typography>
      </ButtonItem>
    </ButtonContainer>
  );
};

export default AuthButtonContainer;
