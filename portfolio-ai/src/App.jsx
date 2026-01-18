import { useState } from "react";
import Hero from "./components/hero/Hero";
import ChatWindow from "./components/chat/chatwindow";
import ChatInput from "./components/chat/chatinput";
import { askAI } from "./services/api";
import "./styles/hero.css";
import "./styles/chat.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (text) => {
    if (!text.trim()) return;

    setShowChat(true);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const reply = await askAI(text);
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className={`app-root ${showChat ? "chat-mode" : ""}`}>
      {!showChat ? (
        <Hero onAsk={handleAsk} />
      ) : (
        <div className="chat-container fade-in">
          <ChatWindow messages={messages} loading={loading} />
          <ChatInput onSend={handleAsk} />
        </div>
      )}
    </div>
  );
}

export default App;
