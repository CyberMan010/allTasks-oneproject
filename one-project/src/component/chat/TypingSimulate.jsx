const TypingIndicator = ({ typingUser }) => (
    typingUser ? (
      <div className="text-sm text-blue-400 italic mb-2">
        {typingUser} is typing...
      </div>
    ) : null
  );
export default TypingIndicator;