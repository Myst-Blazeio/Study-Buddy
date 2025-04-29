package com.chrome.extension_backend.dto;

public class UserQuestionDto {
    private String question;

    public UserQuestionDto() {
    }

    public UserQuestionDto(String question) {
        this.question = question;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
