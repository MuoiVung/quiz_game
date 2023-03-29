import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import theme from "./constants/theme";
import Routes from "./routes/Routes";
import { CssBaseline } from "@mui/material";

import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
