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

    // Method to generate PDF on the disk (saving to file system)
    public void generatePDF(String summary, String filePath) {
        File file = new File(filePath);
        file.getParentFile().mkdirs();

        try (PdfWriter writer = new PdfWriter(filePath);
             PdfDocument pdf = new PdfDocument(writer);
             Document document = new Document(pdf)) {

            PdfFont normalFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);
            PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);

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

        } catch (IOException e) {
            throw new RuntimeException("❌ Error generating PDF: " + e.getMessage());
        }
    }

    // Method to generate PDF in memory and return bytes (for download response)
    public byte[] generatePDF(String summary) {
        try (ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(byteArrayOutputStream);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);

            PdfFont normalFont = PdfFontFactory.createFont(StandardFonts.HELVETICA);
            PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);

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

            document.close();

            return byteArrayOutputStream.toByteArray(); // Return PDF as byte array
        } catch (IOException e) {
            throw new RuntimeException("❌ Error generating PDF: " + e.getMessage());
        }
    }
}
