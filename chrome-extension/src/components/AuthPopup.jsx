// src/components/AuthPopup.jsx
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { Box, Button, Typography, Paper } from "@mui/material";

const AuthPopup = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        width: "auto", // Adjust this for full width or set a specific width like '400px'
        maxWidth: 500, // Max width of the popup, adjust as needed
        height: "auto", // Adjust the height or set a fixed height (e.g., '500px')
        maxHeight: 600, // Optional max height
        margin: "auto",
        mt: 5,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" textAlign="center" gutterBottom>
        {isLogin ? "Login" : "Sign Up"}
      </Typography>

      {isLogin ? (
        <LoginForm onLoginSuccess={onLoginSuccess} />
      ) : (
        <SignupForm onSignupSuccess={() => setIsLogin(true)} />
      )}

      <Box mt={2} textAlign="center">
        <Button
          variant="text"
          onClick={() => setIsLogin(!isLogin)}
          sx={{ mt: 1 }}
        >
          {isLogin ? "Create an account" : "Already have an account? Login"}
        </Button>
      </Box>
    </Paper>
  );
};

export default AuthPopup;
