package com.chrome.extension_backend.controller;

import com.chrome.extension_backend.dto.UserQuestionDto;
import com.chrome.extension_backend.service.AITutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tutor")
public class AITutorController {

	@Autowired
	private AITutorService aiTutorService;

	// Stores the latest answer temporarily
	private String latestAnswer = null;

	@PostMapping("/ask")
	public ResponseEntity<String> askQuestion(@RequestBody UserQuestionDto dto) {
		if (dto.getQuestion() == null || dto.getQuestion().trim().isEmpty()) {
			return ResponseEntity.badRequest().body("❌ Question cannot be empty.");
		}

		String answer = aiTutorService.generateAnswer(dto.getQuestion());
		latestAnswer = answer;
		System.out.println("The answer is :"+ answer);
		return ResponseEntity.ok("✅ Question received. Use /api/tutor/answer to get the response.");
	}

	@GetMapping("/answer")
	public ResponseEntity<String> getAnswer() {
		if (latestAnswer == null) {
			return ResponseEntity.badRequest().body("❌ No answer available. Ask a question first.");
		}
		return ResponseEntity.ok(latestAnswer);
	}
}
