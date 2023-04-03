import { Box } from "@mui/system";
import Navbar from "./Navbar";

const Wrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box component="main">
      <Navbar />
      {children}
    </Box>
  );
};

export default Wrapper;
