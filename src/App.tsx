import store from "./store/store";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorBoundary } from "react-error-boundary";

import theme from "./styles/theme";
import MainRoutes from "./routes/MainRoutes";
import ErrorScreen from "./components/ErrorScreen";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <ErrorBoundary fallback={<ErrorScreen />}>
            <MainRoutes />
          </ErrorBoundary>
        </ThemeProvider>
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
