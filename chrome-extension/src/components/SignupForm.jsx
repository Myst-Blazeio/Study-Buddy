// src/components/SignupForm.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const SignupForm = ({ onSignupSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    setMessage("Signup successful (dummy)");
    onSignupSuccess();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignup}
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
        Sign Up
      </Typography> */}

      {message && <Alert severity="success">{message}</Alert>}

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
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupForm;
