import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowDropUp, Close } from "@mui/icons-material";
import SummarizerButton from "./toolbarbuttons/SummarizerButton";
import AISenseiButton from "./toolbarbuttons/AISenseiButton";
import QuickNotesButton from "./toolbarbuttons/QuickNotesButton";

const Toolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToolbarClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCancelClick = () => {
    setIsOpen(false);
  };

  return (
    <Box sx={styles.toolbarContainer}>
      <Box sx={isOpen ? styles.toolbarOpen : styles.toolbarClosed}>
        {isOpen && (
          <Box sx={styles.buttonsContainer}>
            <SummarizerButton
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <QuickNotesButton onClick={() => alert("Quick Notes clicked")} />
            <AISenseiButton onClick={() => alert("AI Sensei clicked")} />
          </Box>
        )}
        <IconButton sx={styles.mainButton} onClick={handleToolbarClick}>
          {isOpen ? (
            <Close sx={styles.icon} />
          ) : (
            <ArrowDropUp sx={styles.icon} />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

const styles = {
  toolbarContainer: {
    position: "fixed", // Fix the toolbar to the bottom-right of the screen
    bottom: "20px", // Adjust the distance from the bottom
    right: "20px", // Adjust the distance from the right
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  toolbarClosed: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  toolbarOpen: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "transform 0.3s ease",
  },
  mainButton: {
    borderRadius: "50%",
    backgroundColor: "#1976d2",
    padding: "12px",
    color: "white",
  },
  icon: {
    fontSize: "30px",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    marginBottom: "15px",
  },
};

export default Toolbar;
