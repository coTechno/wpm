import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeContextProvider } from "./Context/ThemeContext";
import { AlertContextProvider } from "./Context/AlertContext";
import { TestModeContextProvider } from "./Context/TestMode";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <ThemeContextProvider>
      <AlertContextProvider>
        <TestModeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TestModeContextProvider>
      </AlertContextProvider>
    </ThemeContextProvider>
  // </React.StrictMode>
);
