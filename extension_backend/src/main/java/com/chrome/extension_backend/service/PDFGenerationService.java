package com.chrome.extension_backend.service;

import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

@Service
public class PDFGenerationService {

    private String currentNote; // Holds the latest saved note

    public void setCurrentNote(String note) {
        this.currentNote = note;
        System.out.println("[DEBUG] Current note set in PDFGenerationService:\n" + note);
    }

    public String getCurrentNote() {
        return this.currentNote;
    }

    // File-based PDF generation
    public void generatePDF(String summary, String filePath) {
        File file = new File(filePath);
        file.getParentFile().mkdirs();

        try (PdfWriter writer = new PdfWriter(filePath);
             PdfDocument pdf = new PdfDocument(writer);
             Document document = new Document(pdf)) {

            PdfFont normalFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);
            PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);

            addSummaryAndNotes(document, summary, boldFont, normalFont);

            document.close();

            

        } catch (IOException e) {
            throw new RuntimeException("❌ Error generating PDF: " + e.getMessage());
        }
    }

    // In-memory PDF generation
    public byte[] generatePDF(String summary) {
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(byteArrayOutputStream);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            PdfFont normalFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);
            PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);

            addSummaryAndNotes(document, summary, boldFont, normalFont);

            document.close();

         
            return byteArrayOutputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("❌ Error generating PDF: " + e.getMessage());
        }
    }

    // Shared method to add both summary and note
    private void addSummaryAndNotes(Document document, String summary, PdfFont boldFont, PdfFont normalFont) {
        // Lecture Summary section
        Paragraph headingParagraph = new Paragraph("Lecture Summary")
                .setFont(boldFont)
                .setFontSize(18)
                .setTextAlignment(TextAlignment.CENTER);

        Paragraph bodyParagraph = new Paragraph(summary)
                .setFont(normalFont)
                .setFontSize(12)
                .setTextAlignment(TextAlignment.JUSTIFIED);

        document.add(headingParagraph);
        document.add(bodyParagraph);

        // My Notes section
        if (currentNote != null && !currentNote.trim().isEmpty()) {
            Paragraph noteHeader = new Paragraph("My Notes")
                    .setFont(boldFont)
                    .setFontSize(18)
                    .setMarginTop(20)
                    .setTextAlignment(TextAlignment.CENTER);

            Paragraph noteBody = new Paragraph(currentNote)
                    .setFont(normalFont)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.JUSTIFIED);

            document.add(noteHeader);
            document.add(noteBody);
        }
    }
}
