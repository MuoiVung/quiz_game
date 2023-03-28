import store from "./store/store";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import "./App.css";
import theme from "./constants/theme";
import Router from "./routes/Router";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
