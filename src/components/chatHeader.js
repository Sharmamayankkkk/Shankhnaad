import React from "react";

export default function ChatHeader({ toggleSidebar, isSidebarOpen }) {
  return (
    <div className="chat-header">
      <button 
        className={`sidebar-toggle ${isSidebarOpen ? 'open' : ''}`} 
        onClick={toggleSidebar} 
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        aria-expanded={isSidebarOpen}
      >
        <span className="sidebar-toggle-bar" />
        <span className="sidebar-toggle-bar" />
        <span className="sidebar-toggle-bar" />
      </button>
      <div className="header-content">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Shankhnaad AI" className="chat-logo-img" />
        <h2>Chat</h2>
      </div>
    </div>
  );
}
