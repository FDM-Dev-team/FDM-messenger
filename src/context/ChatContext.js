import { useState, createContext, useContext, useEffect } from "react";
import io from "socket.io-client";



const chatContext = createContext()

export function ChatProvider({ children }) {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [currentActiveChat, setCurrentActiveChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [chatList, setChatList] = useState([]);

  const connectPersonalChannel = user => {
    //console.log("User.user:",user)
    if (!socket) {
      const { user_id, firstname, lastname, username } = user

      const newSocket = io("https://fdm-websocket-production.up.railway.app", {
        query: {
          userId: user_id,
          userName: username,
          firstname: firstname,
          lastname: lastname
        },
      });

      newSocket.on('connect', () => {
        console.log('User_id:', user_id, ' connected to Socket');
      });

      //console.log("Connected to personal channel");
      setSocket(newSocket);
    }
  };

  const connectToChatRoom = (activeChat, UserId) =>{
    console.log("attempting to join room:", activeChat.user_id)
    joinChatRoom('joinRoom', activeChat.user_id, UserId); // Join the chat room when connected
    console.log('Connected to channel:', activeChat.user_id);
  }

  const connectToMyChatRoom = (mychannel, UserId) =>{
    console.log("connecting to my room:", mychannel)
    joinChatRoom('joinRoom', mychannel, UserId); // Join the chat room when connected
    console.log('Connected to my channel:', mychannel);
  }
  
  useEffect(() => {
    if (!socket) return; // Check if socket is null

    const handleChatMessage = (data) => {
      console.log("recieved message:", data )

      const { chatId, sender, message, sentTime } = data;
  
      try {
        const mappedObject = {
          message_id: null,
          chat_id: chatId,
          sender_participant_id: sender,
          text: message,
          time: sentTime,
        };
        setChatLog((prevChatLog) => [...prevChatLog, mappedObject]);
      } catch (error) {
        console.log('Received non-JSON message:', data);
      }
    };

    socket.on("chat message", handleChatMessage);

    // Clean up event listeners when component unmounts or socket changes
    return () => {
      console.log("Socket is unmounted"); // Log when the socket is unmounted
      socket.off("chat message", handleChatMessage);
    };
  }, [socket]);

  const joinChatRoom = (joinroom, room, userId) => {
    if (socket) {
      socket.emit(joinroom, room, userId);
    }
  };

  const sendMessage = (currentActiveChat, userId, activeChat) => {
    console.log('currentActiveChat:', currentActiveChat, ' userId:', userId, ' activeChat:', activeChat);
    if (socket && socket.connected && message.trim() !== '') {
      console.log('send');
      const currentTime = Date.now(); // Get current local time
      const data = {
        roomId: activeChat.user_id,
        chatId: currentActiveChat,
        sender: userId,
        message: message.trim(),
        sentTime: currentTime,
      };
      socket.emit('chat message', data);
      setMessage('');
    }
  };

  const changeCurrentActiveChat = (chatId) => {
    console.log("current active chat:", chatId)
    setCurrentActiveChat(chatId);
  };

  const recieveChatlog = (chatlog) => {
    setChatLog(chatlog);
  };

  const updateChatList = (data) => {
    setChatList(data)
  }

  const contextData = {
    socket,
    connectPersonalChannel,
    connectToChatRoom,
    message,
    setMessage,
    chatLog,
    sendMessage,
    joinChatRoom,
    currentActiveChat,
    changeCurrentActiveChat,
    recieveChatlog,
    chatList, 
    updateChatList,
    connectToMyChatRoom
  };
  return (
    <chatContext.Provider value={contextData}>{children}</chatContext.Provider>
  );
}

export function useChat() {
  return useContext(chatContext);
}
