import { useState, createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';



const chatContext = createContext()

export function ChatProvider({ children }) {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [currentActiveChat, setCurrentActiveChat] = useState(null);
  const [socket, setSocket] = useState(null);

  const connectPersonalChannel = user => {
    console.log("User.user:",user)
    if (!socket) {
      const { user_id, firstname, lastname, username } = user

      const newSocket = io('http://localhost:8000', {
        query: {
          userId: user_id,
          userName: username,
          firstname: firstname,
          lastname: lastname
        },
      });

      newSocket.on('connect', () => {
        joinChatRoom('joinRoom', user_id, user_id); // Join personal channel when connected
      });

      console.log('Connected to personal channel');
      setSocket(newSocket);
    }
  };

  useEffect(() => {
    if (!socket) return; // Check if socket is null

    // Event listener for successful connection
    const handleConnect = () => {
      joinChatRoom('joinRoom', 1, 1); // Join the chat room when connected
      console.log('Connected to friend channel');
    };

    handleConnect();

    const handleChatMessage = (data) => {
      const { roomId, sender, message, sentTime } = data;
    
      try {
        const mappedObject = {
          roomId: roomId,
          sender: sender,
          message: message,
          sentTime: sentTime,
        };
        setChatLog((prevChatLog) => [...prevChatLog, mappedObject]);
      } catch (error) {
        console.log('Received non-JSON message:', data);
      }
    };

    socket.on('chat message', handleChatMessage);

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

  const sendMessage= (room, userId) => {
    console.log('socket:', socket, ' message:', message);
    if (socket && socket.connected && message.trim() !== '') {
      console.log('send');
      const data = {
        roomId: room,
        sender: userId,
        message: message.trim(),
        sentTime: "null"

      };
      socket.emit('chat message', data);
      setMessage('');
    }
  };

  const changeCurrentActiveChat = (chatId) => {
    setCurrentActiveChat(chatId);
  };

  const contextData = {
    socket,
    connectPersonalChannel, // Corrected function name
    message,
    setMessage,
    chatLog,
    sendMessage,
    joinChatRoom,
    currentActiveChat,
    changeCurrentActiveChat,
  };
  return (
    <chatContext.Provider value={contextData}>{children}</chatContext.Provider>
  );
}

export function useChat() {
  return useContext(chatContext)
}
