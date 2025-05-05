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
import MicIcon from "@mui/icons-material/Mic";
import { keyframes, css } from "@emotion/react";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(244, 67, 54, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(244, 67, 54, 0);
  }
`;

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

const InputSection = styled(Box)({
  display: "flex",
  padding: "10px 14px",
  borderTop: "1px solid #ccc",
  alignItems: "center",
  gap: "8px",
});

const InputField = styled(TextField)({
  background: "white",
  borderRadius: "8px",
  fontSize: "14px",
  flexGrow: 1,
  "& .MuiInputBase-root": {
    padding: "6px 10px",
    fontSize: "14px",
    lineHeight: 1.4,
  },
  "& .MuiInputBase-inputMultiline": {
    padding: 0,
  },
  "& .MuiInputBase-input": {
    fontSize: "14px",
  },
  "& input::placeholder, & textarea::placeholder": {
    fontSize: "14px",
    color: "gray",
    opacity: 1,
  },
});

// Keep everything above this the same

const FloatingAIChat = () => {
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [visible, setVisible] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const pausedDueToMic = useRef(false);
  const synthRef = useRef(window.speechSynthesis);

  const speakText = (text) => {
    const synth = synthRef.current;
    if (!text) return;

    // Cancel any ongoing speech
    synth.cancel();

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
      if (index >= chunks.length || isPaused) {
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      utterance.onend = () => {
        index++;
        speakChunk();
      };
      utterance.onerror = () => {
        console.error("Speech error on chunk:", index);
        setIsSpeaking(false);
      };

      synth.speak(utterance);
    };

    setIsSpeaking(true);
    setIsPaused(false);
    speakChunk();
  };

  const toggleSpeech = () => {
    const synth = synthRef.current;
    if (!isSpeaking) {
      speakText(answer);
    } else if (!isPaused) {
      synth.pause();
      setIsPaused(true);
    } else {
      synth.resume();
      setIsPaused(false);
    }
  };

  const handleMicClick = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognitionRef.current = recognition;
    setIsListening(true);
    setInput("");

    if (isSpeaking && !isPaused) {
      synthRef.current.pause();
      pausedDueToMic.current = true;
    }

    const prompt = new SpeechSynthesisUtterance("Listening...");
    prompt.onend = () => recognition.start();
    window.speechSynthesis.speak(prompt);

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setInput((finalTranscript + interimTranscript).trim());
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error", e);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (pausedDueToMic.current && isPaused) {
        synthRef.current.resume();
        setIsPaused(false);
        pausedDueToMic.current = false;
      }

      const finalText = input.trim();
      if (finalText) {
        const confirm = new SpeechSynthesisUtterance("OK");
        confirm.onend = () => handleSend();
        window.speechSynthesis.speak(confirm);
      } else {
        const noInput = new SpeechSynthesisUtterance("No question asked");
        window.speechSynthesis.speak(noInput);
      }
    };
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

  const handleCopy = () => navigator.clipboard.writeText(answer);
  const handleCopyQuestion = () => navigator.clipboard.writeText(question);

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
          <QuestionBubble>
            <Tooltip title="Copy Question">
              <IconButton
                size="small"
                onClick={handleCopyQuestion}
                sx={{
                  backgroundColor: "#ffffffdc",
                  color: "#0d47a1",
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
            <div>{question}</div>
          </QuestionBubble>
        )}
        {answer && (
          <AnswerBox>
            <Tooltip title="Copy Answer">
              <IconButton
                size="small"
                onClick={handleCopy}
                sx={{
                  backgroundColor: "#ffffffdc",
                  color: "#0d47a1",
                }}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
            <div>{answer}</div>
          </AnswerBox>
        )}
      </MessageContainer>

      <InputSection>
        <Tooltip title="Use Speech Input">
          <IconButton
            onClick={handleMicClick}
            sx={{
              backgroundColor: isListening ? "green" : "#e3f2fd",
              color: isListening ? "white" : "#0d47a1",
              animation: isListening ? `${pulse} 1.5s infinite` : "none",
            }}
          >
            <MicIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Speak / Pause / Resume Answer">
          <IconButton
            onClick={toggleSpeech}
            sx={{
              backgroundColor: "#e3f2fd",
              color: "#0d47a1",
            }}
          >
            {isSpeaking && !isPaused ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
        </Tooltip>

        <InputField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          multiline
          rows={1}
          maxRows={4}
          placeholder="Ask a question..."
        />
        <Tooltip title="Send Message">
          <IconButton onClick={handleSend} sx={{ color: "#0d47a1" }}>
            <SendIcon />
          </IconButton>
        </Tooltip>
      </InputSection>
    </FloatingBox>
  );
};

export default FloatingAIChat;
