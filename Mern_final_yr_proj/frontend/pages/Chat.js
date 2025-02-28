// frontend/pages/Chat.js

import { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import AuthContext from '../context/AuthContext';

const socket = io('http://localhost:5000');

const Chat = () => {
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('chatMessage', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const msgData = { sender: user.name, text: message };
            socket.emit('chatMessage', msgData);
            setMessages((prevMessages) => [...prevMessages, msgData]);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.sender}:</strong> {msg.text}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
