import { useState, useRef, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuth } from "../contexts/AuthContext";
import "../styles/glass.css";

const AiChat = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I am the WeCare AI assistant. Please describe your symptoms, and I will recommend the right specialist for you." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when a new message appears
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    

    const updatedMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
 
      const formattedChatHistory = updatedMessages.map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      }));


      const response = await axiosInstance.post("/ai/recommend-doctor", { 
        chatHistory: formattedChatHistory 
      });
      

      const aiReply = response.data.reply || "I found some recommendations for you.";
      
      setMessages((prev) => [...prev, { sender: "ai", text: aiReply }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [...prev, { sender: "ai", text: "Sorry, I am having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Background Overlay (Click to close) */}
      {isOpen && (
        <div 
          onClick={onClose} 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.2)', zIndex: 999 }}
        />
      )}

      {/* The Sliding Glass Sidebar */}
      <div className="glass-card" style={{
        position: 'fixed', top: 0, right: isOpen ? 0 : '-450px',
        width: '400px', height: '100vh', zIndex: 1000,
        transition: 'right 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Smooth bounce effect
        borderRadius: '20px 0 0 20px', borderRight: 'none',
        display: 'flex', flexDirection: 'column', padding: '20px'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '15px', marginBottom: '15px' }}>
          <h3 style={{ color: '#1d5f71', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🤖</span> AI Symptom Checker
          </h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#1d5f71' }}>✖</button>
        </div>

        {/* Auth Check */}
        {!user ? (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: '#1d5f71' }}>
            <div>
              <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>You must be logged in to use the AI.</p>
              <button onClick={onClose} className="login-button">Go to Login</button>
            </div>
          </div>
        ) : (
          <>
            {/* Chat Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', paddingRight: '5px' }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  <div style={{
                    padding: '12px 16px', borderRadius: '15px', fontSize: '14px', lineHeight: '1.4',
                    background: msg.sender === 'user' ? 'linear-gradient(to right, #68B2A0, #85c7b7)' : 'rgba(255,255,255,0.6)',
                    color: msg.sender === 'user' ? '#fff' : '#1d5f71',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && <div style={{ color: '#68B2A0', fontSize: '14px', fontStyle: 'italic' }}>AI is thinking...</div>}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', marginTop: '15px', paddingTop: '15px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Type your symptoms..." 
                disabled={isLoading}
                style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.4)', outline: 'none', color: '#1d5f71' }} 
              />
              <button type="submit" disabled={isLoading} className="login-button" style={{ padding: '10px 20px', margin: 0 }}>
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default AiChat;