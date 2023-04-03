import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import theme from "./constants/theme";
import MainRoutes from "./routes/MainRoutes";
import store from "./store/store";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <MainRoutes />
        </ThemeProvider>
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
