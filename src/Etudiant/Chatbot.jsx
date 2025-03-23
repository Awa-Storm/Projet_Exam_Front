import React, { useState } from "react";
import API_URL from "../api.js"

import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Bonjour ! Comment puis-je vous aider ?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
  
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
  
    try {
      const response = await fetch(`${API_URL}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });
  
      const data = await response.json();
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response || "Pas de réponse.", sender: "bot" },
      ]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message :", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Erreur de connexion au serveur.", sender: "bot" },
      ]);
    }
  };

  return (
    <div style={styles.chatbotContainer}>
      {isOpen ? (
        <div style={styles.chatbot}>
          <div style={styles.header}>
            <h3 style={styles.title}>Chatbot</h3>
            <XMarkIcon
              style={styles.closeIcon}
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.message,
                  backgroundColor: msg.sender === "user" ? "#3b82f6" : "#9ca3af",
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              >
                {msg.text}
              </div>
            ))}
            {loading && <p style={styles.loadingText}>Réflexion en cours...</p>}
          </div>
          <div style={styles.inputContainer}>
            <input
              type="text"
              style={styles.input}
              placeholder="Écrivez un message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={loading}
            />
            <button
              style={styles.sendButton}
              onClick={handleSendMessage}
              disabled={loading}
            >
              <PaperAirplaneIcon style={styles.sendIcon} />
            </button>
          </div>
        </div>
      ) : (
        <button
          style={styles.openButton}
          onClick={() => setIsOpen(true)}
        >
          <ChatBubbleLeftRightIcon style={styles.openIcon} />
          <span style={styles.openText}>Ouvrir le Chat</span>
        </button>
      )}
    </div>
  );
}

export default Chatbot;

const styles = {
  /* Chatbot container */
  chatbotContainer: {
    position: "relative",
    width: "100%",
    marginTop: "1.5rem",
  },

  /* Chatbot box */
  chatbot: {
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    width: "100%",
    padding: "1rem",
    border: "1px solid #e5e7eb",
  },

  /* Header */
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: "0.5rem",
    marginBottom: "0.5rem",
  },

  title: {
    fontSize: "1.125rem",
    fontWeight: "600",
  },

  closeIcon: {
    height: "1.5rem",
    width: "1.5rem",
    cursor: "pointer",
    color: "#6b7280",
    transition: "color 0.3s",
  },

  closeIconHover: {
    color: "#ef4444",
  },

  /* Messages */
  messages: {
    height: "15rem",
    overflowY: "auto",
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    marginBottom: "0.5rem",
  },

  message: {
    padding: "0.5rem",
    borderRadius: "8px",
    color: "white",
    marginBottom: "0.5rem",
  },

  loadingText: {
    color: "#6b7280",
  },

  /* Input section */
  inputContainer: {
    display: "flex",
    marginTop: "0.5rem",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "0.5rem",
  },

  input: {
    flex: 1,
    padding: "0.5rem",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    marginRight: "0.5rem",
  },

  sendButton: {
    backgroundColor: "#3b82f6",
    color: "white",
    padding: "0.5rem",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  sendIcon: {
    height: "1.25rem",
    width: "1.25rem",
  },

  /* Open button */
  openButton: {
    backgroundColor: "#1d4ed8",
    color: "white",
    padding: "0.75rem",
    borderRadius: "8px",
    width: "100%",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  openIcon: {
    height: "1.5rem",
    width: "1.5rem",
  },

  openText: {
    marginLeft: "0.5rem",
  },
};
