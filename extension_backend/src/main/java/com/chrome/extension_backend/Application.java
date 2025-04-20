package com.chrome.extension_backend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        // Load the .env file
        Dotenv dotenv = Dotenv.load();

        // Set the system property for GOOGLE_API_KEY
        System.setProperty("GOOGLE_API_KEY", dotenv.get("GOOGLE_API_KEY"));

        // Run the Spring Boot application
        SpringApplication.run(Application.class, args);
    }
}