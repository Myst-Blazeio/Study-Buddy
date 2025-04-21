// /src/components/Toolbar.jsx
import React, { useState } from "react";
import { Box, IconButton, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SummarizerButton from "./ToolbarButtons/SummarizerButton";
import QuickNotesButton from "./ToolbarButtons/QuickNotesButton";
import AISenseiButton from "./ToolbarButtons/AISenseiButton";

export default function Toolbar() {
  const [open, setOpen] = useState(false);

  const toggleToolbar = () => {
    setOpen(!open);
  };

  return (
    <Box position="fixed" bottom={20} right={20} zIndex={9999}>
      {open && (
        <Box display="flex" flexDirection="column" gap={2} mb={2}>
          <SummarizerButton />
          <QuickNotesButton />
          <AISenseiButton />
        </Box>
      )}
      <Fab color="primary" onClick={toggleToolbar}>
        {open ? <CloseIcon /> : <AddIcon />}
      </Fab>
    </Box>
  );
}
