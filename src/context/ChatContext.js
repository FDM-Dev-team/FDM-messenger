import { useState, createContext, useContext, useEffect } from "react";
// import io from "socket.io-client";
import { postMessage } from "../services/chatService";
import { useUser } from "./UserContext";
import axios from "axios";

import messageSound from "../assets/Notification.mp3";
const chatContext = createContext();

/**
 * Provider component that wraps the chat-related functionality and state.
 * @param {object} children - The child components.
 */
export function ChatProvider({ children }) {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [chatNotifs, setChatNotifs] = useState([]);
  const [currentActiveChat, setCurrentActiveChat] = useState(null);
  const [sockets, setSockets] = useState([]);
  const [chatList, setChatList] = useState([]);
  const User = useUser();

  const connectToRooms = (chatList) => {
    chatList.forEach((chat) => {
      goToRoom(chat.chat_id, User.user.user_id);
    });
  
  }

  const createOrFindRoom = async (roomId) => {
    try {
      const response = await axios.get(`http://localhost:9001/chat/${roomId}`);
      console.log(response)
      return roomId;
    } catch (error) {
      console.error(error);
    }
  }

  const connectToRoom = async (roomId, userId) => {
    const socket = new WebSocket(`ws://localhost:9000/chat/${roomId}/${userId}/ws`);
    console.log('Attempting to connect to server');

    socket.onopen = () => {
      console.log('Connected to server'); 
    }

    socket.onmessage = (message) => {
      console.log('Message received:', message);
      // split sender_id, sender_name, time, message

      const dataObject = JSON.parse(message.data);
      console.log(dataObject);

    }
    const socketRecord = {roomId: roomId, socket: socket}
    console.log(socketRecord)
    
    setSockets(previousSockets => [...previousSockets, socketRecord]);
  }

  const goToRoom = async (roomId, userId) => {
    createOrFindRoom(roomId).then((roomIdFound) => {
      connectToRoom(roomIdFound, userId);
    })
  }

  /**
   * Sends a chat message to the specified chat room.
   * @param {string} chat_id - The ID of the chat room.
   * @param {object} user - The user object.
   */
  const sendMessage = (chat_id, user_id) => {
    console.log("userId:", user_id, " activeChatId:", chat_id);
    // const data = JSON.stringify({ user_id: user_id, message: message });
    console.log(sockets);
  
    sockets
      .filter(s => s.roomId == chat_id)
      .forEach(s => {
        if (s.socket.readyState === WebSocket.OPEN) {
          s.socket.send(message.trim());
        } else {
          console.error("WebSocket is not open: ", s.socket.readyState);
        }
      });
  
    setMessage("");
  };
  

  /**
   * Changes the current active chat to the specified chat.
   * @param {object} chat - The chat object.
   */
  const changeCurrentActiveChat = (chat) => {
    setCurrentActiveChat(chat);
  };

  /**
   * Receives the chat log for the specified chat room.
   * @param {array} chatlog - The chat log data.
   */
  const recieveChatlog = (chatlog) => {
    setChatLog(chatlog);
  };

  /**
   * Updates the chat list with the provided data and adds notification counters for each chat.
   * @param {array} data - The chat list data.
   */
  const updateChatList = (data) => {
    setChatList(data);

    //adding notif counter for each chat
    const mappedChats = data.map((chat) => {
      return { chat_id: chat.chat_id, counter: 0 };
    });

    //console.log("mappedChats:",mappedChats);
    setChatNotifs(mappedChats);
    //console.log("chatNotifs:",chatNotifs)
  };

  /**
   * Resets the notification counter for the specified chat.
   * @param {object} chat - The chat object.
   */
  const resetChatNotif = (chat) => {
    console.log("chatId:", chat);
    console.log("chatNotifs:", chatNotifs);

    const ResetNotif = chatNotifs.map((notif) => {
      if (notif.chat_id === chat.chat_id) {
        return { ...notif, counter: (notif.counter = 0) };
      }
      return notif;
    });
  };

  const contextData = {
    sockets,
    message,
    setMessage,
    chatLog,
    sendMessage,
    // joinChatRoom,
    currentActiveChat,
    changeCurrentActiveChat,
    recieveChatlog,
    chatList,
    updateChatList,
    chatNotifs,
    resetChatNotif,
    connectToRooms
  };
  return (
    <chatContext.Provider value={contextData}>{children}</chatContext.Provider>
  );
}

/**
 * Custom hook that provides access to the chat context.
 * @returns {object} The chat context data.
 */
export function useChat() {
  return useContext(chatContext);
}
