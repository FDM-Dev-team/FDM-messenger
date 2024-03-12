import "./Chat.css";
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:9000/socket'); // Replace with your backend URL and endpoint

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('message', (data) => {
      setChatLog((prevChatLog) => [...prevChatLog, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div
    className="col flex-grow-1 d-flex flex-column p-0"
    style={{ height: "100vh" }}
  >
    <div
      className=" p-0 rounded"
      style={{
        marginBottom: "15px",
        marginTop: "15px",
        marginRight: "15px",
        marginLeft: "5px",
        flex: "1",
        boxShadow: "-4px 4px 10px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div>
      <div>
        {chatLog.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
    </div>
  </div>


    
  );
};

export default Chat;