import React, { useState } from "react";
import { Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DraggableWindow from "../DraggableWindow";

export default function AISenseiButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab onClick={() => setOpen(!open)}>
        <ChatIcon />
      </Fab>
      {open && (
        <DraggableWindow title="AI Sensei" onClose={() => setOpen(false)} />
      )}
    </>
  );
}
