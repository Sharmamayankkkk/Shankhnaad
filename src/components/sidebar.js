import React from "react";
import shannadLogo from "../assets/GPT.png";

const Sidebar = ({ isOpen, onNewChat, conversations = [], activeId, onOpen, onToggle, onDeleteConversation }) => {
  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <img src={shannadLogo} alt="Shankhnad Logo" className="sidebar-logo-img" />
        </div>
        <div className="sidebar-title">Shankhnad</div>
      </div>
      
      <div className="sidebar-actions">
        <button className="new-chat-btn" onClick={onNewChat}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9,22 9,12 15,12 15,22"></polyline>
          </svg>
          New Chat
        </button>
      </div>
      
      <div className="chat-history">
        <div className="history-section">
          <div className="history-title">History</div>
          {conversations.length === 0 ? (
            <div className="no-history">No previous conversations</div>
          ) : (
            <div className="history-list">
              {conversations.slice().reverse().map((c) => (
                <div className="history-item-container">
                  <button
                    key={c.id}
                    className={`history-item ${activeId === c.id ? 'active' : ''}`}
                    onClick={() => onOpen && onOpen(c.id)}
                  >
                    <span className="history-item-text">{c.title || 'New chat'}</span>
                  </button>
                  <button 
                    className="delete-chat-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onDeleteConversation) onDeleteConversation(c.id);
                    }}
                    title="Delete chat"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;