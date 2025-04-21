// /src/components/SignupForm.jsx
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function SignupForm() {
  const [email, setEmail] = useState("newuser@example.com"); // Dummy email
  const [password, setPassword] = useState("newpassword123"); // Dummy password

  const handleSignup = () => {
    // Simulate signup
    alert(`Signed up with ${email}`);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
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
      <Button variant="contained" onClick={handleSignup}>
        Sign Up
      </Button>
    </Box>
  );
}
