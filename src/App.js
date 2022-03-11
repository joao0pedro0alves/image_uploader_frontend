import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/themes/default";

import Main from "./views/Main";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
}
