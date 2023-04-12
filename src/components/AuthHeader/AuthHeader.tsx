import React from "react";
import { WelcomeBrand, WelcomeTitle } from "./styles";
import IconSvg from "../IconSvg/IconSvg";
import { Typography } from "@mui/material";
import { AuthHeaderProps } from "./types";

const AuthHeader = ({ title, subTitle }: AuthHeaderProps) => {
  return (
    <>
      <WelcomeBrand>
        <IconSvg name="brand" />
      </WelcomeBrand>
      <WelcomeTitle>
        <Typography>{title}</Typography>
        <Typography>{subTitle}</Typography>
      </WelcomeTitle>
    </>
  );
};

export default AuthHeader;
