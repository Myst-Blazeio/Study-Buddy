// src/components/HelloWorld.jsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const HelloWorld = () => {
  return (
    <Paper
      elevation={4}
      sx={{
        padding: 4,
        marginTop: 4,
        textAlign: "center",
        maxWidth: 400,
        mx: "auto",
        borderRadius: 3,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Hello World 👋
      </Typography>
      <Typography variant="body1">
        You are now logged in. This is a dummy protected component.
      </Typography>
    </Paper>
  );
};

export default HelloWorld;
