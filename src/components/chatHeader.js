import React from "react";
import logo from "../assets/GPT.png";

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
        <img src={logo} alt="Logo" className="chat-logo-img" />
        <h2>Chat</h2>
      </div>
    </div>
  );
}
