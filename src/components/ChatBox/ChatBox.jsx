import React, { useState, useEffect } from 'react';

const ChatBox = ({ sendMessage, messages }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            sendMessage(message);
            setMessage(''); // Clear the input field after sending
        }
    };

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatBox;
