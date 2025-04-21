import React from "react";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function DraggableWindow({ title, onClose }) {
  return (
    <Box position="fixed" top={100} left={100} zIndex={99999}>
      <Paper sx={{ p: 2, width: 300 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" mt={2}>
          Placeholder content for {title}.
        </Typography>
      </Paper>
    </Box>
  );
}
