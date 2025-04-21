import React, { useState } from "react";
import { Fab } from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";
import DraggableWindow from "../DraggableWindow";

export default function QuickNotesButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Fab onClick={() => setOpen(!open)}>
        <NoteIcon />
      </Fab>
      {open && (
        <DraggableWindow title="Quick Notes" onClose={() => setOpen(false)} />
      )}
    </>
  );
}
