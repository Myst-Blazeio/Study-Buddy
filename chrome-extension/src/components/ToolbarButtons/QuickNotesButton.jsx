import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";

const QuickNotesButton = ({ onClick }) => {
  return (
    <Tooltip title="Quick Notes">
      <IconButton sx={styles.button} onClick={onClick}>
        <Edit sx={styles.icon} />
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

export default QuickNotesButton;
