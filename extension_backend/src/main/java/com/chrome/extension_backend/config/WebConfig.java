package com.chrome.extension_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Match your API endpoint path
                        .allowedOrigins("chrome-extension://mabbpoelgkflealjmliejhmeikpbeanl") // Or specify your extension ID origin in production
                        .allowedMethods("GET", "POST")
                        .allowedHeaders("*");
            }
        };
    }
}