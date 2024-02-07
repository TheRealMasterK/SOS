// src/components/Chatroom/Chatroom.jsx
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './Chatroom.css'; // Make sure to create this CSS file

const Chatroom = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('Chatroom')
            .orderBy('timestamp', 'asc')
            .onSnapshot(snapshot => {
                const messagesData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setMessages(messagesData);
            });

        return () => unsubscribe();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        try {
            await firebase.firestore().collection('Chatroom').add({
                message: newMessage,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                // Include user identification if needed, e.g., username or userID
            });
            setNewMessage('');
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    return (
        <div className="Chatroom">
            <div className="chatHeader">
                <h2>Universal Chat Room</h2>
            </div>
            <div className="messages">
                {messages.map(msg => (
                    <div key={msg.id} className="message">
                        <p>{msg.message}</p>
                        {/* Display user info if available */}
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="sendMessageForm">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chatroom;
