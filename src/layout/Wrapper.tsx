import { Box } from "@mui/system";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Wrapper = () => {
  return (
    <Box component="main">
      <Navbar />
      <Outlet />
    </Box>
  );
};

export default Wrapper;
