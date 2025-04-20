package com.chrome.extension_backend.model;

public class VideoSummaryResponse {

    private String summary;
    private String pdfFilePath;

    public VideoSummaryResponse(String summary, String pdfFilePath) {
        this.summary = summary;
        this.pdfFilePath = pdfFilePath;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getPdfFilePath() {
        return pdfFilePath;
    }

    public void setPdfFilePath(String pdfFilePath) {
        this.pdfFilePath = pdfFilePath;
    }
}
