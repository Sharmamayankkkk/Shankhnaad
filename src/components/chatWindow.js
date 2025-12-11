import React, { useEffect, useMemo, useRef } from "react";
import MessageBubble from "./messageBubble";

const ChatWindow = ({ messages, isTyping }) => {
  const bottomRef = useRef(null);

  // scroll to bottom on new message
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const hasUserMessage = useMemo(() => messages.some(m => m.sender === "user"), [messages]);
  const showEmpty = !messages.length || !hasUserMessage;

  return (
    <div className="chat-window">
      {showEmpty && (
        <div className="empty-state">
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Shankhnaad AI" className="empty-logo" />
          <div className="empty-text">Hare Krishna. Jai Srila Prabhupada. I am Shankhnad — how can I help you?</div>
        </div>
      )}
      {messages
        .filter((m) => hasUserMessage ? true : m.sender === "user")
        .map((msg, idx) => (
          <MessageBubble key={idx} sender={msg.sender} text={msg.text} />
        ))}
      {isTyping && (
        <div className="typing-indicator">Bot is typing...</div>
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatWindow;
