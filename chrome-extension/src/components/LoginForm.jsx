// /src/components/LoginForm.jsx
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function LoginForm() {
  const [email, setEmail] = useState("testuser@example.com");
  const [password, setPassword] = useState("testpassword123");

  const handleLogin = () => {
    if (email === "testuser@example.com" && password === "testpassword123") {
      localStorage.setItem("loggedIn", "true");

      // Notify the content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: "SHOW_TOOLBAR" });
      });

      alert("Login successful!");
      window.close();
    } else {
      alert("Invalid credentials.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} width="250px">
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}
