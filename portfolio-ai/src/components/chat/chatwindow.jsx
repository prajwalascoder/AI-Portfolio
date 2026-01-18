import MessageBubble from "./messagebubble";
import TypingIndicator from "./typingindicator";

function ChatWindow({ messages, loading }) {
  return (
    <div className="chat-window glass">
      {messages.map((msg, i) => (
        <MessageBubble key={i} role={msg.role} content={msg.content} />
      ))}
      {loading && <TypingIndicator />}
    </div>
  );
}

export default ChatWindow;