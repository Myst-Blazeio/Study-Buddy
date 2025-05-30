import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Tooltip,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import { askTutorAndGetAnswer } from "../../util/DiagonalButton.util"; // Adjust path if needed
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

// Styled Components
const FloatingBox = styled(Paper)({
  position: "fixed",
  bottom: "100px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "420px",
  background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
  borderRadius: "16px",
  boxShadow: "0 8px 30px rgba(0, 123, 255, 0.2)",
  overflow: "hidden",
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
});

const Header = styled(Box)({
  background: "#0d47a1",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 16px",
});

const HeaderButtons = styled(Box)({
  display: "flex",
  gap: "8px",
});

const MessageContainer = styled(Box)({
  flex: 1,
  overflowY: "auto",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  maxHeight: "280px",
});

const AnswerBox = styled(Box)({
  display: "flex",
  alignItems: "flex-start",
  gap: "8px",
  background: "#ffffff",
  borderRadius: "12px",
  padding: "10px 14px",
  color: "#0d47a1",
  maxWidth: "90%",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  overflowWrap: "anywhere",
});

const QuestionBubble = styled(Box)({
  alignSelf: "flex-end",
  background: "linear-gradient(to right, #42a5f5, #1e88e5)",
  color: "white",
  padding: "10px 14px",
  borderRadius: "12px",
  maxWidth: "80%",
  whiteSpace: "pre-wrap",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  overflowWrap: "anywhere",
});

const InputSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  borderTop: "1px solid #ccc",
  backgroundColor: "#f5f5f5",
  gap: "8px",
}));

const InputField = styled(TextField)({
  backgroundColor: "#fff",
  borderRadius: "12px",
  flexGrow: 1,
  "& .MuiInputBase-root": {
    padding: "10px 14px",
    fontSize: "medium",
    borderRadius: "12px",
    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid #ccc",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#90caf9",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#1976d2",
    boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
  },
  "& input::placeholder, & textarea::placeholder": {
    fontSize: "medium",
    color: "#888",
    opacity: 1,
  },
});

const SendButton = styled(IconButton)({
  backgroundColor: "#1976d2",
  color: "#fff",
  borderRadius: "12px",
  width: "48px",
  height: "48px",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "#1565c0",
  },
});

const FloatingAIChat = () => {
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [visible, setVisible] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(window.speechSynthesis);

  const speakText = (text) => {
    const synth = synthRef.current;

    if (!text) return;

    // If already speaking, stop and toggle off
    if (isSpeaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    // Split into smaller chunks by sentence
    const sentences = text.match(/[^.!?]+[.!?]*|\s+/g)?.filter(Boolean) || [];
    const maxChunkSize = 180;
    const chunks = [];

    let chunk = "";
    for (const sentence of sentences) {
      if ((chunk + sentence).length > maxChunkSize) {
        chunks.push(chunk.trim());
        chunk = sentence;
      } else {
        chunk += sentence;
      }
    }
    if (chunk.trim()) chunks.push(chunk.trim());

    let index = 0;

    const speakChunk = () => {
      if (index >= chunks.length) {
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      utterance.onend = () => {
        index++;
        speakChunk(); // Speak the next chunk
      };
      utterance.onerror = () => {
        console.error("Speech error on chunk:", index);
        setIsSpeaking(false);
      };

      synth.speak(utterance);
    };

    setIsSpeaking(true);
    speakChunk();
  };

  useEffect(() => {
    const savedQ = localStorage.getItem("lastQuestion");
    const savedA = localStorage.getItem("lastAnswer");
    if (savedQ && savedA) {
      setQuestion(savedQ);
      setAnswer(savedA);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const currentQuestion = input;
    setInput("");
    setQuestion(currentQuestion);
    setAnswer("...");

    try {
      const generatedAnswer = await askTutorAndGetAnswer(currentQuestion);
      setAnswer(generatedAnswer);
      localStorage.setItem("lastQuestion", currentQuestion);
      localStorage.setItem("lastAnswer", generatedAnswer);
    } catch (error) {
      setAnswer("There was an error getting the answer.");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(answer);
  };
  const handleCopyQuestion = () => {
    navigator.clipboard.writeText(question);
  };

  const handleReset = () => {
    setQuestion(null);
    setAnswer(null);
    localStorage.removeItem("lastQuestion");
    localStorage.removeItem("lastAnswer");
  };

  if (!visible) return null;

  return (
    <FloatingBox elevation={6}>
      <Header>
        <Typography variant="subtitle1" sx={{ fontSize: "medium" }}>
          AI Tutor
        </Typography>
        <HeaderButtons>
          <Tooltip title="Reset Chat">
            <IconButton onClick={handleReset} size="small">
              <RefreshIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton onClick={() => setVisible(false)} size="small">
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </HeaderButtons>
      </Header>

      <MessageContainer>
        {question && (
          <QuestionBubble
            sx={{
              fontSize: "medium",
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
            }}
          >
            <Tooltip title="Copy Question">
              <IconButton
                size="small"
                onClick={handleCopyQuestion}
                sx={{
                  backgroundColor: "#ffffffdc",
                  color: "#8d8d8d",
                  padding: "4px",
                  height: "24px",
                  width: "24px",
                  alignSelf: "flex-start",
                  marginTop: "2px",
                }}
              >
                <ContentCopyIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            <Box sx={{ flex: 1, whiteSpace: "pre-wrap" }}>{question}</Box>
          </QuestionBubble>
        )}
        {answer && (
          <AnswerBox>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <Tooltip title="Copy Answer">
                <IconButton
                  size="small"
                  onClick={handleCopy}
                  sx={{
                    backgroundColor: "#e3f2fd",
                    padding: "4px",
                    height: "28px",
                    width: "28px",
                  }}
                >
                  <ContentCopyIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
              <Tooltip title={isSpeaking ? "Stop Speaking" : "Speak Answer"}>
                <IconButton
                  size="small"
                  onClick={() => speakText(answer)}
                  sx={{
                    backgroundColor: "#e3f2fd",
                    padding: "4px",
                    height: "28px",
                    width: "28px",
                    color: "#8d8d8d",
                    "&:hover": {
                      backgroundColor: "#bbdefb",
                    },
                  }}
                >
                  {isSpeaking ? (
                    <VolumeOffIcon fontSize="small" />
                  ) : (
                    <VolumeUpIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            <Typography
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", fontSize: "medium" }}
            >
              {answer}
            </Typography>
          </AnswerBox>
        )}
      </MessageContainer>

      <InputSection>
        <InputField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Type your question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <SendButton onClick={handleSend}>
          <SendIcon sx={{ fontSize: "24px" }} />
        </SendButton>
      </InputSection>
    </FloatingBox>
  );
};

export default FloatingAIChat;
