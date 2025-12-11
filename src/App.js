import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";

// Material Design 3 inspired dark theme
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#A8C5FF",
      light: "#C4D9FF",
      dark: "#8AAFFF",
    },
    secondary: {
      main: "#FFA726",
      light: "#FFB74D",
      dark: "#F57C00",
    },
    background: {
      default: "#0A0A0A",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#E3E3E3",
      secondary: "#B3B3B3",
    },
  },
  typography: {
    fontFamily: '"Google Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 24,
          padding: "10px 24px",
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
