import React from "react";

const MessageBubble = ({ sender, text }) => {
  const isUser = sender === "user";
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {}
  };
  return (
    <div className={`message-row ${isUser ? "user" : "bot"}`}>
      {!isUser && (
        <div className="bot-avatar">
          <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Shankhnad" className="bot-logo" />
        </div>
      )}
      <div className="message-bubble">
        {text}
        {!isUser && (
          <button className="copy-btn" onClick={copyToClipboard} aria-label="Copy message">Copy</button>
        )}
      </div>
    </div>
  );
};
export default MessageBubble;