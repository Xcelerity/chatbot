import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css'; 

const API_URL = 'http://localhost:5001/api/chat';

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = { sender: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      
      const response = await axios.post(API_URL, {
        message: message,
      });

    
      const botMessage = { sender: 'bot', text: response.data.response };
      setChatHistory(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="chat-window">
        <header className="chat-header">
          <h1>AI Chatbot</h1>
          <p>Answers in a Single Paragraph</p>
        </header>
        <div className="chat-messages" ref={chatContainerRef}>
          {chatHistory.map((chat, index) => (
            <div key={index} className={`message ${chat.sender}`}>
              <p>{chat.text}</p>
            </div>
          ))}
          {isLoading && (
            <div className="message bot">
              <p className="loading-dots"><span>.</span><span>.</span><span>.</span></p>
            </div>
          )}
        </div>
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            aria-label="Chat input"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;