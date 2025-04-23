import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Chat } from "@mui/icons-material";

const AISenseiButton = ({ onClick }) => {
  return (
    <Tooltip title="AI Sensei">
      <IconButton sx={styles.button} onClick={onClick}>
        <Chat sx={styles.icon} />
      </IconButton>
    </Tooltip>
  );
};

const styles = {
  button: {
    borderRadius: "50%",
    backgroundColor: "#1976d2",
    padding: "12px",
    color: "white",
    transition: "transform 0.2s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  icon: {
    fontSize: "30px",
  },
};

export default AISenseiButton;
