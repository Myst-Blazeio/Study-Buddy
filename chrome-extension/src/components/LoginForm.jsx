// src/components/LoginForm.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dummyEmail = "user@example.com";
  const dummyPassword = "password";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === dummyEmail && password === dummyPassword) {
      localStorage.setItem("isLoggedIn", "true");
      onLoginSuccess();
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
        width: "100%",
        maxWidth: 300,
      }}
    >
      {/* <Typography variant="h5" textAlign="center">
        Login
      </Typography> */}

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
