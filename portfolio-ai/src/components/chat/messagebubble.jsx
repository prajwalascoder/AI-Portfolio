function MessageBubble({ role, content }) {
  return (
    <div className={`message ${role === "user" ? "user" : "bot"}`}>
      {content}
    </div>
  );
}

export default MessageBubble;
