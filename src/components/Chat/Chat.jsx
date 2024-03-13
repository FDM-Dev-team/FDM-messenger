import React, { useEffect, useState } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [socket, setSocket] = useState(null);
  const [recipientId, setRecipientId] = useState('RECIPIENT_ID'); // Replace with the actual recipient ID
  const [chatId, setChatId] = useState('CHAT_ID'); // Replace with the actual chat ID

  useEffect(() => {
    // Generate a unique identifier for the user
    const userId = 'YOUR_UNIQUE_IDENTIFIER'; // Replace with your actual unique identifier generation logic

    // Initialize WebSocket connection with the unique identifier, recipient ID, and chat ID
    const newSocket = new WebSocket(`ws://localhost:9000/socket?userId=${userId}&recipientId=${recipientId}&chatId=${chatId}`);

    // Update socket state
    setSocket(newSocket);

    // Clean up function to close socket when component unmounts
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [recipientId, chatId]); // Run useEffect whenever the recipientId or chatId changes

  useEffect(() => {
    if (!socket) return; // Check if socket is null

    // Event listener for successful connection
    socket.onopen = () => {
      console.log('Connected to server');
    };

    // Event listener for incoming messages
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Handle JSON message
        setChatLog((prevChatLog) => [...prevChatLog, data]);
      } catch (error) {
        // Handle non-JSON message
        console.log('Received non-JSON message:', event.data);
      }
    };
  }, [socket]); // Add socket to dependency array to handle updates

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      socket.send(message);
      setMessage('');
    }
  };

  const terminateConnection = () => {
    if (socket) {
      socket.close();
      setSocket(null);
    }
  };

  return (
    <div className="col flex-grow-1 d-flex flex-column p-0" style={{ height: "100vh" }}>
      <div
        className="p-0 rounded"
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
          <button onClick={terminateConnection} disabled={!socket}>Terminate Connection</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
