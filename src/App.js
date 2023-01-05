import React from "react";
import HomePage from "./Pages/HomePage";
import UserPage from "./Pages/UserPage";
import ComparePage from "./Pages/ComparePage";
import Alert from "./Components/Alert";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { GlobalStyles } from "./Styles/global";
import { Route, Routes } from "react-router-dom";
// import { auth } from "./firebaseConfig";

function App() {
  const { theme } = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Alert />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/compare/:username" element={<ComparePage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
