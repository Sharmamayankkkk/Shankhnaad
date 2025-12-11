import React, { useEffect, useState, useCallback } from "react";
import ChatHeader from "../components/chatHeader";
import ChatWindow from "../components/chatWindow";
import ChatInput from "../components/chatInput";
import Sidebar from "../components/sidebar";
import gitaDataRaw from '../data/gita_data.json'; 

const gitaData = gitaDataRaw.map(v => ({
  verse: v.VERSE ? String(v.VERSE).trim() : "",
  devanagari: v.DEVANAGRI ? v.DEVANAGRI.trim() : "",
  translation: v.TRANSLATION? v.TRANSLATION.trim() : "",
  purport: v.PURPORT ? v.PURPORT.trim() : ""
}));

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Sidebar toggle
  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    if (newState) document.body.classList.add('sidebar-open');
    else document.body.classList.remove('sidebar-open');
  };

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
        document.body.classList.remove('sidebar-open');
      } else {
        setIsSidebarOpen(true);
        document.body.classList.add('sidebar-open');
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        setConversations(prev => {
          const next = prev.map(c => c.id === activeId ? { ...c, messages } : c);
          localStorage.setItem("chat_conversations", JSON.stringify(next));
          return next;
        });
      }
    } catch (_) {}
  }, [messages, activeId]);

  // QnA logic
  const answerQuestion = useCallback((question) => {
    if (!question.trim()) return "server issue";
  
    const lowerQ = question.trim().toLowerCase();
  
    // Remove common question words
    const questionWords = ["what", "where", "how", "why", "who", "is", "are", "the", "a", "an", "of", "in", "for"];
    const queryWords = lowerQ.split(/\s+/).filter(w => !questionWords.includes(w) && w.length > 2);
    if (!queryWords.length) return "Please ask a clear question.";
  
    // Search in translation + purport
    const results = gitaData
      .map(v => {
        const text = `${v.translation} ${v.purport}`.toLowerCase();
        let score = 0;
        const sentences = text.split(/[.?!]/);
        sentences.forEach((s, i) => {
          queryWords.forEach(kw => {
            if (s.includes(kw)) score += 10 - i;       // earlier sentence = higher score
            const count = s.split(kw).length - 1;
            score += count * 5;                        // multiple occurrences increase score
          });
        });
        return { ...v, score };
      })
      .filter(v => v.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5); // top 5
  
    if (!results.length) return `I couldn't find a relevant answer for your question.`;
  
    // Combine translation + purport (~1000 words)
    let combined = "";
    for (let r of results) {
      const block = `${r.translation}\n${r.purport ? r.purport : ''}\n\n`;
      if ((combined + block).split(/\s+/).length > 1000) break;
      combined += block;
    }
  
    return combined.trim();
  }, []);

  // Keyword search (only purport)
  const searchKeyword = useCallback((query) => {
    if (!query.trim()) return "Please enter a keyword.";

    const stopwords = ["the","is","of","and","a","in","to","with","for","on","by","as","an","at"];
    const keywords = query.toLowerCase().split(/\s+/).filter(w => !stopwords.includes(w) && w.length > 2);
    if (!keywords.length) return "keyword not found";

    const scored = gitaData.map(v => {
      let score = 0;
      const text = v.purport ? v.purport.toLowerCase() : "";
      const sentences = text.split(/[.?!]/);
      keywords.forEach(kw => {
        sentences.forEach((s, i) => {
          if (s.includes(kw)) score += 10 - i; // earlier sentence = higher score
          const count = s.split(kw).length - 1;
          score += count * 5; // multiple occurrences increase score
        });
      });
      return { ...v, score };
    });

    const topResults = scored.filter(v => v.score > 0)
                             .sort((a, b) => b.score - a.score)
                             .slice(0, 5);

    if (!topResults.length) return `No relevant result found for '${query}'.`;

    let combined = "";
    for (let r of topResults) {
      const block = `${r.purport ? r.purport : ''}\n\n`;
      if ((combined + block).split(/\s+/).length > 1000) break;
      combined += block;
    }

    return combined.trim();
  }, []);

  // Main search function
  const searchGita = useCallback((query) => {
    const trimmed = query.trim().toLowerCase();

    // Chapter search
    const chapterMatch = trimmed.match(/^(?:chapter|ch)?\s*(\d+)$/i);
    if (chapterMatch) {
      const chapterNum = chapterMatch[1];
      const chapterVerses = gitaData.filter(v => v.verse.startsWith(chapterNum + '.'));
      if (!chapterVerses.length) return `❌ Chapter ${chapterNum} not found.`;
      return chapterVerses.map(v => 
        `🔸 ${v.verse}\n${v.devanagari}\n🌐 ${v.translation}\n${v.purport ? `📚 ${v.purport}` : ''}`
      ).join("\n\n");
    }

    // Verse search
    if (/^\d+\.\d+$/.test(trimmed)) {
      const verse = gitaData.find(v => v.verse === trimmed);
      if (!verse) return `❌ Verse ${trimmed} not found.`;
      return `📜 Verse ${verse.verse}\n${verse.devanagari}\n🌐 ${verse.translation}\n${verse.purport ? `📚 ${verse.purport}` : 'No purport available.'}`;
    }

    // Keyword search first
    const keywordResults = searchKeyword(trimmed);
    if (keywordResults && !keywordResults.startsWith("No relevant")) return keywordResults;

    // QnA fallback
    return answerQuestion(trimmed);
  }, [answerQuestion, searchKeyword]);

  // Send message
  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text }]);
    setIsTyping(true);

    try {
      const response = searchGita(text);
      setMessages(prev => [...prev, { sender: "bot", text: response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: "bot", text: "⚠️ An error occurred while processing your request." }]);
    } finally {
      setIsTyping(false);
    }
  };

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
    const conv = conversations.find(c => c.id === id);
    if (!conv) return;
    setActiveId(id);
    setMessages(conv.messages || []);
    try {
      localStorage.setItem("chat_messages", JSON.stringify(conv.messages || []));
    } catch (_) {}
  };

  // Delete conversation
  const deleteConversation = (id) => {
    if (conversations.length <= 1) {
      handleNewChat();
      return;
    }

    const updatedConversations = conversations.filter(conv => conv.id !== id);
    setConversations(updatedConversations);

    if (activeId === id) {
      const nextActive = updatedConversations[updatedConversations.length - 1];
      setActiveId(nextActive.id);
      setMessages(nextActive.messages || []);
      try {
        localStorage.setItem("chat_messages", JSON.stringify(nextActive.messages || []));
      } catch (_) {}
    }

    try {
      localStorage.setItem("chat_conversations", JSON.stringify(updatedConversations));
    } catch (_) {}
  };

  // Render
  return (
    <div className="chat-page">
      <ChatHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="chat-layout">
        {(isSidebarOpen || !isMobile) && (
          <Sidebar 
            isOpen={isSidebarOpen} 
            onNewChat={handleNewChat}
            conversations={conversations} 
            activeId={activeId} 
            onOpen={openConversation}
            onDeleteConversation={deleteConversation}
            onToggle={toggleSidebar}
          />
        )}
        <div className="chat-main">
          <ChatWindow messages={messages} isTyping={isTyping} />
          <ChatInput sendMessage={sendMessage} isTyping={isTyping} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
