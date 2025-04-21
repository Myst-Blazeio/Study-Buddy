import React from "react";
import { Box, Button, Typography } from "@mui/material";

export default function ToolbarMenu() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
      width="100%"
      minWidth={280}
      gap={2}
    >
      <Typography variant="h6">Toolbox</Typography>
      <Button variant="contained" fullWidth color="primary">
        Summarizer
      </Button>
      <Button variant="outlined" fullWidth>
        Quick Notes
      </Button>
      <Button variant="outlined" fullWidth>
        AI Sensei
      </Button>
    </Box>
  );
}
