import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ToolbarMenu from "./ToolbarMenu"; // <== NEW

import { Box, Button, Typography } from "@mui/material";

export default function AuthPopup() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // <== NEW

  if (isAuthenticated) {
    return <ToolbarMenu />; // <== After login, show the toolbar
  }

  return (
    <Box
      p={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      minWidth={280}
    >
      <Typography variant="h6" gutterBottom>
        {isLogin ? "Login" : "Sign Up"}
      </Typography>
      {isLogin ? (
        <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <SignupForm onSignupSuccess={() => setIsAuthenticated(true)} />
      )}
      <Button fullWidth onClick={() => setIsLogin(!isLogin)} sx={{ mt: 2 }}>
        {isLogin ? "Create an account" : "Back to Login"}
      </Button>
    </Box>
  );
}
