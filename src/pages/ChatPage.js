import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Button,
  Paper,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
  Fab,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Add as AddIcon,
  Send as SendIcon,
  Delete as DeleteIcon,
  ContentCopy as ContentCopyIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import gitaDataRaw from "../data/gita_data.json";

const gitaData = gitaDataRaw.map((v) => ({
  verse: v.VERSE ? String(v.VERSE).trim() : "",
  devanagari: v.DEVANAGRI ? v.DEVANAGRI.trim() : "",
  translation: v.TRANSLATION ? v.TRANSLATION.trim() : "",
  purport: v.PURPORT ? v.PURPORT.trim() : "",
}));

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const ChatPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [inputValue, setInputValue] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  // QnA logic
  const answerQuestion = useCallback((question) => {
    if (!question.trim()) return "Please ask a question.";

    const lowerQ = question.trim().toLowerCase();
    const questionWords = ["what", "where", "how", "why", "who", "is", "are", "the", "a", "an", "of", "in", "for"];
    const queryWords = lowerQ.split(/\s+/).filter((w) => !questionWords.includes(w) && w.length > 2);
    if (!queryWords.length) return "Please ask a clear question.";

    const results = gitaData
      .map((v) => {
        const text = `${v.translation} ${v.purport}`.toLowerCase();
        let score = 0;
        const sentences = text.split(/[.?!]/);
        sentences.forEach((s, i) => {
          queryWords.forEach((kw) => {
            if (s.includes(kw)) score += 10 - i;
            const count = s.split(kw).length - 1;
            score += count * 5;
          });
        });
        return { ...v, score };
      })
      .filter((v) => v.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (!results.length) return `I couldn't find a relevant answer for your question.`;

    let combined = "";
    for (let r of results) {
      const block = `📜 Verse ${r.verse}\n${r.translation}\n${r.purport ? r.purport : ""}\n\n`;
      if ((combined + block).split(/\s+/).length > 1000) break;
      combined += block;
    }

    return combined.trim();
  }, []);

  // Keyword search
  const searchKeyword = useCallback((query) => {
    if (!query.trim()) return "Please enter a keyword.";

    const stopwords = ["the", "is", "of", "and", "a", "in", "to", "with", "for", "on", "by", "as", "an", "at"];
    const keywords = query
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => !stopwords.includes(w) && w.length > 2);
    if (!keywords.length) return "Please provide meaningful keywords.";

    const scored = gitaData.map((v) => {
      let score = 0;
      const text = v.purport ? v.purport.toLowerCase() : "";
      const sentences = text.split(/[.?!]/);
      keywords.forEach((kw) => {
        sentences.forEach((s, i) => {
          if (s.includes(kw)) score += 10 - i;
          const count = s.split(kw).length - 1;
          score += count * 5;
        });
      });
      return { ...v, score };
    });

    const topResults = scored
      .filter((v) => v.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    if (!topResults.length) return `No relevant result found for '${query}'.`;

    let combined = "";
    for (let r of topResults) {
      const block = `📜 Verse ${r.verse}\n${r.purport ? r.purport : ""}\n\n`;
      if ((combined + block).split(/\s+/).length > 1000) break;
      combined += block;
    }

    return combined.trim();
  }, []);

  // Main search function
  const searchGita = useCallback(
    (query) => {
      const trimmed = query.trim().toLowerCase();

      // Chapter search
      const chapterMatch = trimmed.match(/^(?:chapter|ch)?\s*(\d+)$/i);
      if (chapterMatch) {
        const chapterNum = chapterMatch[1];
        const chapterVerses = gitaData.filter((v) => v.verse.startsWith(chapterNum + "."));
        if (!chapterVerses.length) return `Chapter ${chapterNum} not found.`;
        return chapterVerses
          .map((v) => `📜 Verse ${v.verse}\n${v.devanagari}\n${v.translation}\n${v.purport ? v.purport : ""}`)
          .join("\n\n");
      }

      // Verse search
      if (/^\d+\.\d+$/.test(trimmed)) {
        const verse = gitaData.find((v) => v.verse === trimmed);
        if (!verse) return `Verse ${trimmed} not found.`;
        return `📜 Verse ${verse.verse}\n${verse.devanagari}\n${verse.translation}\n${verse.purport ? verse.purport : "No purport available."}`;
      }

      // Keyword search first
      const keywordResults = searchKeyword(trimmed);
      if (keywordResults && !keywordResults.startsWith("No relevant")) return keywordResults;

      // QnA fallback
      return answerQuestion(trimmed);
    },
    [answerQuestion, searchKeyword]
  );

  // Send message
  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setMessages((prev) => [...prev, { sender: "user", text: userMessage, timestamp: Date.now() }]);
    setIsTyping(true);

    // Scroll to bottom
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
      // Simulate typing delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      const response = searchGita(userMessage);
      setMessages((prev) => [...prev, { sender: "bot", text: response, timestamp: Date.now() }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ An error occurred while processing your request.", timestamp: Date.now() },
      ]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // Load saved chat
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chat_messages");
      const savedConvs = localStorage.getItem("chat_conversations");
      if (saved) setMessages(JSON.parse(saved));
      if (savedConvs) {
        const parsedConvs = JSON.parse(savedConvs);
        setConversations(parsedConvs);
        if (parsedConvs.length) setActiveId(parsedConvs[parsedConvs.length - 1].id);
      }
    } catch (_) {}
  }, []);

  // Save chat
  useEffect(() => {
    try {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
      if (activeId) {
        setConversations((prev) => {
          const next = prev.map((c) => (c.id === activeId ? { ...c, messages } : c));
          localStorage.setItem("chat_conversations", JSON.stringify(next));
          return next;
        });
      }
    } catch (_) {}
  }, [messages, activeId]);

  // New chat
  const handleNewChat = () => {
    const id = Date.now().toString();
    const newConv = { id, title: "New chat", messages: [], createdAt: Date.now() };
    const next = [...conversations, newConv];
    setConversations(next);
    setActiveId(id);
    setMessages([]);
    try {
      localStorage.setItem("chat_messages", JSON.stringify([]));
      localStorage.setItem("chat_conversations", JSON.stringify(next));
    } catch (_) {}
  };

  // Open conversation
  const openConversation = (id) => {
    const conv = conversations.find((c) => c.id === id);
    if (!conv) return;
    setActiveId(id);
    setMessages(conv.messages || []);
    if (isMobile) setIsSidebarOpen(false);
  };

  // Delete conversation
  const deleteConversation = (id) => {
    const updatedConversations = conversations.filter((conv) => conv.id !== id);
    setConversations(updatedConversations);

    if (activeId === id) {
      if (updatedConversations.length > 0) {
        const nextActive = updatedConversations[updatedConversations.length - 1];
        setActiveId(nextActive.id);
        setMessages(nextActive.messages || []);
      } else {
        handleNewChat();
      }
    }

    try {
      localStorage.setItem("chat_conversations", JSON.stringify(updatedConversations));
    } catch (_) {}
  };

  // Copy message
  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
    setSnackbar({ open: true, message: "Copied to clipboard!", severity: "success" });
  };

  const drawerWidth = 280;

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "rgba(30, 30, 30, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 1 }}>
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="Shankhnaad AI"
              style={{ width: 32, height: 32, borderRadius: 8 }}
            />
            <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
              Shankhnaad AI
            </Typography>
          </Box>
          <IconButton color="inherit" onClick={() => navigate("/")}>
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "background.paper",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewChat}
            sx={{
              bgcolor: "primary.main",
              color: "#000",
              "&:hover": { bgcolor: "primary.light" },
            }}
          >
            New Chat
          </Button>
        </Box>
        <Divider />
        <List sx={{ flexGrow: 1, overflow: "auto", px: 1 }}>
          {conversations.length === 0 ? (
            <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
              <Typography variant="body2">No conversations yet</Typography>
            </Box>
          ) : (
            conversations
              .slice()
              .reverse()
              .map((conv) => (
                <ListItem
                  key={conv.id}
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      size="small"
                      onClick={() => deleteConversation(conv.id)}
                      sx={{ color: "text.secondary" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                  sx={{ mb: 0.5 }}
                >
                  <ListItemButton
                    selected={activeId === conv.id}
                    onClick={() => openConversation(conv.id)}
                    sx={{
                      borderRadius: 2,
                      "&.Mui-selected": {
                        bgcolor: "primary.dark",
                        "&:hover": { bgcolor: "primary.dark" },
                      },
                    }}
                  >
                    <ListItemText
                      primary={conv.title || "New chat"}
                      primaryTypographyProps={{
                        noWrap: true,
                        fontSize: "0.9rem",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))
          )}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: { md: `calc(100% - ${isSidebarOpen ? drawerWidth : 0}px)` },
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />

        {/* Messages Area */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",
            p: { xs: 2, md: 3 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: 2,
              }}
            >
              <MotionBox
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/logo.png"}
                  alt="Shankhnaad AI"
                  style={{ width: 80, height: 80, borderRadius: 16 }}
                />
              </MotionBox>
              <Typography variant="h5" sx={{ fontWeight: 600, textAlign: "center" }}>
                Welcome to Shankhnaad AI
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", textAlign: "center", maxWidth: 500 }}>
                Ask questions about the Bhagavad Gita, search for specific verses, or explore spiritual wisdom
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", mt: 2 }}>
                <Chip
                  label="What is dharma?"
                  onClick={() => {
                    setInputValue("What is dharma?");
                  }}
                  sx={{ cursor: "pointer" }}
                />
                <Chip
                  label="Chapter 2"
                  onClick={() => {
                    setInputValue("Chapter 2");
                  }}
                  sx={{ cursor: "pointer" }}
                />
                <Chip
                  label="Verse 2.47"
                  onClick={() => {
                    setInputValue("2.47");
                  }}
                  sx={{ cursor: "pointer" }}
                />
              </Box>
            </Box>
          ) : (
            <Box sx={{ maxWidth: 900, mx: "auto", width: "100%" }}>
              <AnimatePresence>
                {messages.map((msg, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    sx={{
                      display: "flex",
                      justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2, maxWidth: "85%", alignItems: "flex-start" }}>
                      {msg.sender === "bot" && (
                        <Avatar
                          src={process.env.PUBLIC_URL + "/logo.png"}
                          sx={{ width: 36, height: 36, mt: 0.5 }}
                        />
                      )}
                      <MotionPaper
                        elevation={0}
                        sx={{
                          p: 2,
                          bgcolor: msg.sender === "user" ? "primary.dark" : "background.paper",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          borderRadius: 3,
                          position: "relative",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                            lineHeight: 1.6,
                          }}
                        >
                          {msg.text}
                        </Typography>
                        {msg.sender === "bot" && (
                          <IconButton
                            size="small"
                            onClick={() => copyMessage(msg.text)}
                            sx={{
                              position: "absolute",
                              top: 8,
                              right: 8,
                              opacity: 0.7,
                              "&:hover": { opacity: 1 },
                            }}
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        )}
                      </MotionPaper>
                    </Box>
                  </MotionBox>
                ))}
              </AnimatePresence>

              {isTyping && (
                <MotionBox
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  sx={{ display: "flex", gap: 2, mb: 2 }}
                >
                  <Avatar src={process.env.PUBLIC_URL + "/logo.png"} sx={{ width: 36, height: 36 }} />
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "background.paper",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 3,
                    }}
                  >
                    <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                      Searching the Bhagavad Gita...
                    </Typography>
                  </Paper>
                </MotionBox>
              )}
              <div ref={messagesEndRef} />
            </Box>
          )}
        </Box>

        {/* Input Area */}
        <Box
          sx={{
            p: { xs: 2, md: 3 },
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            bgcolor: "rgba(30, 30, 30, 0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ maxWidth: 900, mx: "auto", display: "flex", gap: 2, alignItems: "flex-end" }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask about the Bhagavad Gita..."
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "background.paper",
                  borderRadius: 3,
                },
              }}
            />
            <Fab
              color="primary"
              size="medium"
              onClick={sendMessage}
              disabled={!inputValue.trim() || isTyping}
              sx={{
                bgcolor: "primary.main",
                color: "#000",
                "&:hover": { bgcolor: "primary.light" },
              }}
            >
              <SendIcon />
            </Fab>
          </Box>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              mt: 1,
              color: "text.secondary",
            }}
          >
            Shankhnaad AI may display inaccurate information. Please verify important spiritual guidance.
          </Typography>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChatPage;
