// /src/components/ToolbarButtons/SummarizerButton.jsx
import React, { useState } from "react";
import { Fab } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

export default function SummarizerButton() {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const dummyProgress = [10, 25, 50, 75, 100];

  const startDownload = () => {
    setDownloading(true);
    let i = 0;
    const interval = setInterval(() => {
      setProgress(dummyProgress[i]);
      i++;
      if (i >= dummyProgress.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDownloading(false);
          setProgress(0);
        }, 500);
      }
    }, 300);
  };

  return (
    <Fab color="secondary" onClick={startDownload}>
      {downloading ? `${progress}%` : <DownloadIcon />}
    </Fab>
  );
}
