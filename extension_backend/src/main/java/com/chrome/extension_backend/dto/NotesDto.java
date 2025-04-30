package com.chrome.extension_backend.dto;

public class NotesDto {
    private String notes;

    public NotesDto() {
    }

    public NotesDto(String notes) {
        this.notes = notes;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
