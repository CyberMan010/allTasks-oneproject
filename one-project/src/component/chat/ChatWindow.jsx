import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setTypingUser } from '../../store/slices/chatSlice'
import Message from './Message';
import MessageInput from './MessageInput';
import UserList from './UserList';
import TypingIndicator from './TypingSimulate';

const ChatWindow = () => {
  const dispatch = useDispatch();
  const { messages, typingUser, users } = useSelector(state => state.chat);
  const chatRef = useRef();

  useEffect(() => {
    dispatch(addMessage({ text: "Welcome to the chat!", author: "System" }));
    const messageInterval = simulateMessages();
    const typingInterval = simulateTyping();

    return () => {
      clearInterval(messageInterval);
      clearInterval(typingInterval);
    };
  }, [dispatch]);

  const simulateMessages = () => {
    return setInterval(() => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomMessage = getRandomMessage();
      dispatch(addMessage({ text: randomMessage, author: randomUser }));
    }, 8000);
  };

  const simulateTyping = () => {
    return setInterval(() => {
      if (!typingUser) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        dispatch(setTypingUser(randomUser));
        setTimeout(() => dispatch(setTypingUser(null)), 2000);
      }
    }, 5000);
  };

  const getRandomMessage = () => {
    const messages = [
      "Hey there!", "How are you?", "Nice weather today!",
      "What are you working on?", "I am good, you?"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  return (
    <div className="flex justify-center max-w-4xl mx-auto border border-blue-900 rounded shadow-lg bg-[#0a0a1a]">
      <div className="flex-1 flex flex-col">
        <div ref={chatRef} className="h-[500px] overflow-y-auto p-4">
          {messages.map((message) => (
            <Message key={message.id} {...message} />
          ))}
          <TypingIndicator typingUser={typingUser} />
        </div>
        <MessageInput
          onSendMessage={(text) => dispatch(addMessage({ text, author: "You" }))}
          onTyping={(isTyping) => dispatch(setTypingUser(isTyping ? "You" : null))}
        />
      </div>
      <div className="w-64 bg-[#1a1a2e] border-l border-blue-900">
        <UserList
          users={users.map(name => ({ id: name, name }))}
          typingUser={typingUser ? [typingUser] : []}
        />
      </div>
    </div>
  );
};

export default ChatWindow;