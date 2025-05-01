package com.chrome.extension_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.chrome.extension_backend.dto.NotesDto;
import com.chrome.extension_backend.service.PDFGenerationService;

@RestController
@RequestMapping("/api/notes")
public class NoteTaker {

    @Autowired
    private PDFGenerationService pdfGenerationService;

    @PostMapping("/current")
	public ResponseEntity<String> saveNotes(@RequestBody NotesDto dto) {
    	if (dto.getNotes() == null || dto.getNotes().trim().isEmpty()) {
            System.out.println("[WARN] Empty note received in /save endpoint.");
            pdfGenerationService.setCurrentNote(null);
            return ResponseEntity.badRequest().body("❌ Notes cannot be empty.");
        }

        // Log and set the current note
        System.out.println("[INFO] Received note to save:");
        System.out.println(dto.getNotes());

        pdfGenerationService.setCurrentNote(dto.getNotes());

        return ResponseEntity.ok("✅ Note saved successfully.\n\n[DEBUG] Current note: " + dto.getNotes());
	}
    @GetMapping("/return")
    public ResponseEntity<String> getCurrentNote() {
        String note = pdfGenerationService.getCurrentNote();

        if (note == null || note.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("❌ No current note available.");
        }

        System.out.println("[INFO] Returning current note:");
        System.out.println(note);

        return ResponseEntity.ok("📄 Current note:\n\n" + note);
    }

}
