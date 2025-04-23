import React from "react";
import { IconButton, Tooltip, CircularProgress } from "@mui/material";
import { GetApp } from "@mui/icons-material";

const SummarizerButton = ({ isLoading, setIsLoading }) => {
  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false); // Simulate a dummy loading process
    }, 3000); // 3 seconds delay to simulate download
  };

  return (
    <Tooltip title="Summarizer">
      <IconButton sx={styles.button} onClick={handleClick} disabled={isLoading}>
        {isLoading ? (
          <CircularProgress size={24} sx={styles.loading} />
        ) : (
          <GetApp sx={styles.icon} />
        )}
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
  loading: {
    color: "white",
  },
};

export default SummarizerButton;
