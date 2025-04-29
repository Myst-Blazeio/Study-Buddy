package com.chrome.extension_backend.controller;

import com.chrome.extension_backend.dto.NotesDto;
import com.chrome.extension_backend.service.NoteEnhancerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notes")
public class NoteEnhancerController {

    @Autowired
    private NoteEnhancerService noteEnhancerService;

    private String latestEnhancedNotes = null;

    @PostMapping("/enhance")
    public ResponseEntity<String> enhanceNotes(@RequestBody NotesDto dto) {
        if (dto.getNotes() == null || dto.getNotes().trim().isEmpty()) {
            System.out.println("[INFO] Enhancement failed: Notes cannot be empty.");
            return ResponseEntity.badRequest().body("❌ Notes cannot be empty.");
        }

        // Step 1: Log the received note
        System.out.println("[INFO] Notes received for enhancement: ");
        System.out.println(dto.getNotes());

        // Step 2: Enhance the notes
        System.out.println("[INFO] Enhancing notes...");
        String enhanced = noteEnhancerService.enhanceNotes(dto.getNotes());
        
        // Step 3: Log the enhanced notes
        System.out.println("[INFO] Enhanced notes generated: ");
        System.out.println(enhanced);
        
        // Step 4: Set the latest enhanced notes and log progress
        latestEnhancedNotes = enhanced;
        System.out.println("[INFO] Enhanced notes stored successfully.");

        return ResponseEntity.ok("✅ Notes received. Use /api/notes/result to get the enhanced version.");
    }

    @GetMapping("/result")
    public ResponseEntity<String> getEnhancedNotes() {
        if (latestEnhancedNotes == null) {
            System.out.println("[INFO] No enhanced notes available yet.");
            return ResponseEntity.badRequest().body("❌ No enhanced notes available. Submit notes first.");
        }

        // Log the enhanced note being returned
        System.out.println("[INFO] Returning enhanced notes: ");
        System.out.println(latestEnhancedNotes);

        return ResponseEntity.ok(latestEnhancedNotes);
    }
}
