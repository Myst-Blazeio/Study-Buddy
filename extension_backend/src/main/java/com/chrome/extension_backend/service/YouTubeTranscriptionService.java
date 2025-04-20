package com.chrome.extension_backend.service;

import org.springframework.stereotype.Service;
import java.io.*;
import java.util.Arrays;
import java.util.List;

@Service
public class YouTubeTranscriptionService {

    public String transcribeVideo(String youtubeUrl) {
        try {
            String videoId = extractVideoId(youtubeUrl);
            String audioFile = downloadAudio(videoId);
            if (audioFile == null) {
                throw new RuntimeException("❌ Audio download failed.");
            }

            return transcribeAudio(audioFile);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("❌ Transcription failed.");
        }
    }

    private String extractVideoId(String url) {
        return url.split("v=")[1].split("&")[0];
    }

    private String downloadAudio(String videoId) {
        try {
            String outputDir = "src/main/resources/OutputFile";
            File dir = new File(outputDir);

            if (dir.exists() && dir.isDirectory()) {
                for (File file : dir.listFiles()) {
                    if (file.getName().endsWith(".mp3")) {
                        file.delete();
                    }
                }
            }

            String outputFile = outputDir + "/" + videoId + ".mp3";
            String videoUrl = "https://www.youtube.com/watch?v=" + videoId;

            List<String> command = Arrays.asList(
                    "yt-dlp", "--extract-audio", "--audio-format", "mp3",
                    "-o", outputFile, videoUrl
            );

            System.out.println("📥 Running command: " + String.join(" ", command));

            ProcessBuilder pb = new ProcessBuilder(command);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("[yt-dlp] " + line);
            }

            process.waitFor();

            File file = new File(outputFile);
            return file.exists() ? outputFile : null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    private String transcribeAudio(String audioFile) {
        try {
            ProcessBuilder pb = new ProcessBuilder("python", "scripts/transcribe.py", audioFile);
            pb.redirectErrorStream(true);
            Process process = pb.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"));
            StringBuilder transcription = new StringBuilder();
            boolean startCapturing = false;

            String line;
            while ((line = reader.readLine()) != null) {
                if (line.contains("Transcription complete!")) {
                    startCapturing = true;
                    continue;
                }

                if (startCapturing) {
                    transcription.append(line).append("\n");
                }
            }

            process.waitFor();
            return transcription.toString().trim();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
