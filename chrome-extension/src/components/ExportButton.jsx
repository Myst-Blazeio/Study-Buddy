import React from "react";
import { Button } from "@mui/material";
import axios from "axios";

const ExportButton = ({ isSummaryReady }) => {
  const handleExport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/downloadSummary",
        {
          responseType: "blob", // to handle binary PDF data
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "summary.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("❌ Error downloading the PDF:", err);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleExport}
      disabled={!isSummaryReady}
      sx={{ marginTop: 2 }}
    >
      Export PDF
    </Button>
  );
};

export default ExportButton;
