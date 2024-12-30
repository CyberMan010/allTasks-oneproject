import React from "react";

const MessageInput = ({ onSendMessage, onTyping }) => {
    const [message, setMessage] = React.useState('');
    const [typingTimeout, setTypingTimeout] = React.useState(null);
  
    const handleChange = (e) => {
      setMessage(e.target.value);
      
      // Handle typing indicator
      if (typingTimeout) clearTimeout(typingTimeout);
      onTyping(true);
      
      const timeout = setTimeout(() => {
        onTyping(false);
      }, 1000); 
      setTypingTimeout(timeout);
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message);
        setMessage('');
        onTyping(false);
        if (typingTimeout) clearTimeout(typingTimeout);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="p-4 border-t border-blue-900">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Type a message..."
            className="input h-[34px] text-[14px] w-[240px] bg-[#1a1a2e] text-[#f4f4f5] px-3 py-1 rounded-lg border border-blue-900/30 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-[#0a0a1a] transition-all duration-150 ease-in-out"
          />
          <button 
            type="submit" 
            className="relative hover:text-blue-300 py-2 px-6 after:absolute after:h-1 after:hover:h-[200%] transition-all duration-500 hover:transition-all hover:duration-500 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden z-20 after:z-[-20] after:bg-blue-900 after:rounded-t-full after:w-full after:bottom-0 after:left-0 text-blue-100"
          >
            Send
          </button>
        </div>
      </form>
    );
  };

export default MessageInput;