package com.chrome.extension_backend.controller;

import com.chrome.extension_backend.dto.VideoRequest;
import com.chrome.extension_backend.service.GoogleAISummarizerService;
import com.chrome.extension_backend.service.PDFGenerationService;
import com.chrome.extension_backend.service.YouTubeTranscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api")
public class VideoSummaryController {

    @Autowired
    private YouTubeTranscriptionService transcriptionService;

    @Autowired
    private GoogleAISummarizerService summarizerService;

    @Autowired
    private PDFGenerationService pdfGenerationService;

    private final String OUTPUT_PATH = "output/summary.pdf";
    private final String DOWNLOAD_ENDPOINT = "/api/downloadSummary";

    @PostMapping("/summarize")
    public ResponseEntity<String> summarizeVideo(@RequestBody VideoRequest request) {
        try {
            String youtubeUrl = request.getYoutubeUrl();

            if (youtubeUrl == null || youtubeUrl.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("❌ YouTube URL is missing.");
            }

            System.out.println("🎯 Received URL: " + youtubeUrl);

            String transcription = transcriptionService.transcribeVideo(youtubeUrl);
            String summary = summarizerService.generateSummary(transcription);

            pdfGenerationService.generatePDF(summary, OUTPUT_PATH);

            String downloadUrl = "http://localhost:8080" + DOWNLOAD_ENDPOINT;
            System.out.println("📄 Summary PDF available at: " + downloadUrl);

            return ResponseEntity.created(URI.create(downloadUrl)).body("✅ Summary PDF is ready. Download it here: " + downloadUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("❌ Error during summarization: " + e.getMessage());
        }
    }

    // Endpoint to download the summary.pdf
    @GetMapping("/downloadSummary")
    public ResponseEntity<byte[]> downloadSummary() {
        try {
            byte[] pdfBytes = pdfGenerationService.generatePDF("Auto-generated summary for download"); // Optional dummy or actual summary
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=summary.pdf")
                    .body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }
}
