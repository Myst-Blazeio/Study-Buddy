import React, { useState } from "react";
import { Drawer, Typography, Box } from "@mui/material";
import StartButton from "./StartButton";
import ExportButton from "./ExportButton";
import styled from "@emotion/styled";
import axios from "axios";

const Container = styled(Box)`
  width: 300px;
  padding: 20px;
`;

const Sidebar = ({ videoUrl }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [isSummaryReady, setIsSummaryReady] = useState(false);

  const handleStart = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/summarize", {
        youtubeUrl: videoUrl,
      });

      console.log("✅ Backend response:", response.data);

      setIsStarted(true);
      setIsSummaryReady(true); // Enable ExportButton after summary is ready
    } catch (error) {
      console.error("❌ Error summarizing video:", error);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={true}
      variant="persistent"
      sx={{
        "& .MuiDrawer-paper": {
          width: 320,
          padding: 2,
        },
      }}
    >
      <Container>
        <Typography variant="h6" gutterBottom>
          Study Buddy 📘
        </Typography>

        {!isStarted ? (
          <StartButton onStart={handleStart} />
        ) : (
          <ExportButton isSummaryReady={isSummaryReady} />
        )}
      </Container>
    </Drawer>
  );
};

export default Sidebar;
