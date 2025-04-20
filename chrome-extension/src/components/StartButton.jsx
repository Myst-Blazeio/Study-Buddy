import React from "react";
import { Button } from "@mui/material";
import axios from "axios";

const StartButton = ({ setVideoUrl, setIsSummaryReady }) => {
  const handleStart = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const url = new URL(tab.url);
    const videoId = url.searchParams.get("v");
    const fullUrl = `https://www.youtube.com/watch?v=${videoId}`;
    setVideoUrl(fullUrl);

    try {
      const response = await axios.post("http://localhost:8080/api/summarize", {
        youtubeUrl: fullUrl,
      });

      if (response.status === 200) {
        setIsSummaryReady(true);
      }
    } catch (err) {
      console.error("❌ Error summarizing:", err);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleStart}>
      Start Now
    </Button>
  );
};

export default StartButton;
