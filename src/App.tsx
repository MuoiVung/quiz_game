import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";

import theme from "./constants/theme";
import Routes from "./routes/Routes";
import store from "./store/store";
import { ToastContainer } from "react-toastify";

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
