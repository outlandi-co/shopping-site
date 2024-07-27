import React, { useState } from 'react';
import './chatBox.scss';

const ChatBox = () => {
  const [messages, setMessages] = useState([{ text: 'Welcome to the chat!', sender: 'bot' }]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      console.log('Sending message:', input); // Debugging log
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');

      // Mock receiving a response
      setTimeout(() => {
        const botResponse = { text: 'This is a response from the bot', sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('Enter key pressed'); // Debugging log
      sendMessage();
    }
  };

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => {
            console.log('Input changed:', e.target.value); // Debugging log
            setInput(e.target.value);
          }}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
