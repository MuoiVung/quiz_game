import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import theme from "./constants/theme";
import Routes from "./routes/Routes";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
      <ToastContainer />
    </Provider>
  );
}

export default App;
