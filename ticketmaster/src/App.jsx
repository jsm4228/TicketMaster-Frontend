import "./App.css";
import Nav from "./components/Nav";
import Main from "./components/Main";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { blue } from "@mui/material/colors";
import Header from "./components/Header";
const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blue[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: blue[800],
    },
  },
});

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div>
          <div>
            <Header />
          </div>
          <div>
            <Main />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
