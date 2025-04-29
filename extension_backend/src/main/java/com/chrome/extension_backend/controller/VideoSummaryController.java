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

    // 👉 Variable to store the generated summary
    private String latestSummary = null;

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

            // 👉 Save the latest summary for downloading
            latestSummary = summary;

            pdfGenerationService.generatePDF(summary, OUTPUT_PATH);

            String downloadUrl = "http://localhost:8080" + DOWNLOAD_ENDPOINT;
            System.out.println("📄 Summary PDF available at: " + downloadUrl);

            return ResponseEntity.created(URI.create(downloadUrl)).body("✅ Summary PDF is ready. Download it here: " + downloadUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("❌ Error during summarization: " + e.getMessage());
        }
    }

    @GetMapping("/downloadSummary")
    public ResponseEntity<byte[]> downloadSummary() {
        try {
            if (latestSummary == null) {
                return ResponseEntity.badRequest().body(null);
            }

            byte[] pdfBytes = pdfGenerationService.generatePDF(latestSummary);

            // 👉 Delete the generated file after preparing the PDF
            java.nio.file.Path path = java.nio.file.Paths.get(OUTPUT_PATH);
            java.nio.file.Files.deleteIfExists(path);
            latestSummary = null;
            System.out.println("🧹 Deleted the generated PDF and cleared summary.");

            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=summary.pdf")
                    .body(pdfBytes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(null);
        }
    }

}
