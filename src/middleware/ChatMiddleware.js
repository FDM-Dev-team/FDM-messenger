import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useChatMiddleware = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [socket, setSocket] = useState(null);

  const connectPeronalChannel = () => {
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
      
    
      newSocket.on('connect', () => {
        joinChatRoom('joinRoom', 'roomId_1', 'userId_1'); // Join personal channel when connected
      });

      console.log('Connected to personal channel');
      setSocket(newSocket);
    }
  };

  useEffect(() => {
    if (!socket) return; // Check if socket is null
  
    // Event listener for successful connection
    const handleConnect = () => {
      joinChatRoom('joinRoom', 'roomId_1', 'userId_1'); // Join the chat room when connected
      console.log('Connected to friend channel');

    };
    // socket.on('connect', handleConnect);
    handleConnect()

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
    //console.log(socket)

    // Clean up event listeners when component unmounts or socket changes
    return () => {
      console.log('Socket is unmounted'); // Log when the socket is unmounted
      socket.off('connect', handleConnect);
      socket.off('chat message', handleChatMessage);
    };
  }, [socket]);


  const joinChatRoom = (joinroom, room, userId) => {
    if (socket) {
      socket.emit(joinroom, room, userId);
    }
  };

  
  const sendMessage = () => {
    console.log("socket:", socket, " message:", message);
    if (socket && socket.connected && message.trim() !== '') {
      console.log("send");
      const data = {
        roomId: 'roomId_1', // Replace 'your-room-id' with the actual room ID
        message: message.trim(),
      };
      socket.emit('chat message', data);
      setMessage('');
    }
  };

  return {
    socket,
    connectPeronalChannel,
    message,
    setMessage,
    chatLog,
    sendMessage,
    joinChatRoom
  };
};

export default useChatMiddleware;