package com.chrome.extension_backend.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.springframework.stereotype.Service;

@Service
public class YouTubeTranscriptionService {

    public String transcribeVideo(String youtubeUrl) {
    	 System.out.println("🔗 Video URL received: " + youtubeUrl);
         String videoId = extractVideoId(youtubeUrl);
         System.out.println("🔍 Video ID extracted: " + videoId);
         
         if (videoId == null || videoId.isEmpty()) {
             System.err.println("❌ Invalid YouTube URL.");
             return "";
         }
         
         try {
             // Update the path to your python executable in the .venv folder
             String pythonExecutable = "scripts/.venv/Scripts/python"; // Adjust this based on your environment

             // Create a ProcessBuilder using the Python executable path and the script path
             ProcessBuilder pb = new ProcessBuilder(pythonExecutable, "scripts/api.py", videoId);
             System.out.println("Working..");
             pb.redirectErrorStream(true);
             Process process = pb.start();

             BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"));
             StringBuilder output = new StringBuilder();
             String line;
             while ((line = reader.readLine()) != null) {
                 output.append(line).append("\n");
             }

             int exitCode = process.waitFor();
             if (exitCode != 0) {
                 System.err.println("❌ Python script failed.");
                 return "";
             }
             System.out.println("Transcript:"+output.toString().trim());
             return output.toString().trim();
         } catch (Exception e) {
             e.printStackTrace();
             return "";
         }
    }


    private String extractVideoId(String url) {
        try {
            if (url.contains("v=")) {
                return url.split("v=")[1].split("&")[0];
            } else if (url.contains("youtu.be/")) {
                return url.split("youtu.be/")[1].split("\\?")[0];
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
