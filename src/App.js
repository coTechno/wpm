import React from "react";
import HomePage from "./Pages/HomePage";
import Alert from "./Components/Alert";
import { ThemeProvider } from "styled-components";

import { useTheme } from "./Context/ThemeContext";
import { GlobalStyles } from "./Styles/global";
import { Route, Routes } from "react-router-dom";
function App() {
  const { theme } = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Alert />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
