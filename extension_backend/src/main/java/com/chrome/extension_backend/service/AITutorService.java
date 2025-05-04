package com.chrome.extension_backend.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;

@Service
public class AITutorService {

    private static final String API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent";
    private static String API_KEY = "";

    // Retry settings
    private static final int MAX_RETRIES = 3;
    private static final int INITIAL_BACKOFF_MS = 1000;

    static {
        try {
            API_KEY = loadApiKey();
        } catch (Exception e) {
            System.err.println("⚠️ Failed to load API key: " + e.getMessage());
        }
    }

    private static String loadApiKey() {
        String apiKey = System.getProperty("GOOGLE_API_KEY");
        if (apiKey == null || apiKey.isEmpty()) {
            throw new RuntimeException("API Key is missing in system properties!");
        }
        return apiKey;
    }

    public String generateAnswer(String question) {
        if (API_KEY.isEmpty()) {
            return "Error: API Key is missing!";
        }

        String apiUrlWithKey = API_URL + "?key=" + API_KEY;

        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                URL url = URI.create(apiUrlWithKey).toURL();
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setDoOutput(true);

                JSONObject requestBody = new JSONObject();
                JSONArray contents = new JSONArray();
                JSONObject part = new JSONObject();
                part.put("text", "Answer this user's question in a helpful and concise way: \n\n" + question
                        + " Ensure the summary is well-organized and easy to skim. Do not use special characters such as [*,#,~,-] or bold and italic text in the final answer, instead make the points numbered:");
                JSONObject content = new JSONObject();
                content.put("parts", new JSONArray().put(part));
                contents.put(content);
                requestBody.put("contents", contents);

                try (OutputStream os = conn.getOutputStream()) {
                    byte[] input = requestBody.toString().getBytes("utf-8");
                    os.write(input, 0, input.length);
                }

                if (conn.getResponseCode() >= 500) {
                    throw new IOException("Server error: " + conn.getResponseCode());
                }

                BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
                StringBuilder response = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }

                JSONObject jsonResponse = new JSONObject(response.toString());
                JSONArray candidates = jsonResponse.optJSONArray("candidates");

                if (candidates != null && candidates.length() > 0) {
                    JSONObject candidate = candidates.getJSONObject(0);
                    JSONObject contentResponse = candidate.optJSONObject("content");
                    JSONArray parts = contentResponse.optJSONArray("parts");

                    if (parts != null && parts.length() > 0) {
                        return parts.getJSONObject(0).getString("text");
                    }
                }

                return "Error: No answer generated.";

            } catch (IOException e) {
                System.err.println("Attempt " + attempt + " failed: " + e.getMessage());
                if (attempt == MAX_RETRIES) {
                    return "Error generating answer: " + e.getMessage();
                }
                try {
                    Thread.sleep(INITIAL_BACKOFF_MS * (long) Math.pow(2, attempt - 1)); // Exponential backoff
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    return "Error generating answer: interrupted during backoff";
                }
            } catch (Exception e) {
                return "Error generating answer: " + e.getMessage();
            }
        }

        return "Error: Failed to generate answer after retries.";
    }
}
