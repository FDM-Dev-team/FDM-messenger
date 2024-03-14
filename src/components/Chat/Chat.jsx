import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize Socket.IO connection only if socket is null
    if (!socket) {
      const user = {
        id: 1,
        name: 'John Doe',
      };
      
      const newSocket = io('http://localhost:8000', {
        query: {
          userId: user.id,
          userName: user.name,
        },
      });
      setSocket(newSocket);
    }

    // Clean up function to disconnect socket when component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return; // Check if socket is null

  // Event listener for successful connection
  const handleConnect = () => {
    console.log('Connected to server');
    joinChatRoom('joinRoom','roomId_1','userId_1'); // Join the chat room when connected
  };
  socket.on('connect', handleConnect);

    // Event listener for incoming messages
    const handleChatMessage = (data) => {
      try {
        // Handle JSON message
        setChatLog((prevChatLog) => [...prevChatLog, data]);
      } catch (error) {
        // Handle non-JSON message
        console.log('Received non-JSON message:', data);
      }
    };
    socket.on('chat message', handleChatMessage);

    // Clean up event listeners when component unmounts or socket changes
    return () => {
      socket.off('connection', handleConnect);
      socket.off('chat message', handleChatMessage);
    };
  }, [socket]);

  const joinChatRoom = (joinroom, room, userId) => {
    if (socket) {
      socket.emit(joinroom, room,userId);
    }
  };

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      const data = {
        roomId: 'roomId_1', // Replace 'your-room-id' with the actual room ID
        message: message.trim(),
      };
      socket.emit('chat message', data);
      setMessage('');
    }
  };

  return (
    <div className="col flex-grow-1 d-flex flex-column p-0" style={{ height: "100vh" }}>
      <div className="p-0 rounded" style={{
        marginBottom: "15px",
        marginTop: "15px",
        marginRight: "15px",
        marginLeft: "5px",
        flex: "1",
        boxShadow: "-4px 4px 10px rgba(0, 0, 0, 0.4)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <div>
          {chatLog.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <div className='mb-5'>
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