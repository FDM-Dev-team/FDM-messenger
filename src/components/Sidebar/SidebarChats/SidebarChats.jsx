import { useState, createContext, useContext, useEffect } from 'react';
import "./SidebarChats.css";
import axios from "axios";
import { useChat } from '../../../context/ChatContext'
import { useUser } from "../../../context/UserContext";

export default function SideBarChats({ chat }) {
  const { changeCurrentActiveChat, currentActiveChat } = useChat();
  const [isActiveChat, setIsActiveChat] = useState(false);
  const User = useUser();

  useEffect(() => {
    setIsActiveChat(currentActiveChat === chat.chat_id);
  }, [currentActiveChat, chat.chat_id]);


  if (chat.chat_id === User.user.user_id) {
    return null; // Do not render the component if it's the same as the user's chat_id
  }

  return (
    <div
      className={`d-flex align-items-center border my-1 ${isActiveChat ? 'active-chat' : ''}`}
      style={{
        width: "300px",
        height: "75px",
        borderRadius: "20px",
        padding: "10px",
        cursor: "pointer",
        boxShadow: "-2px 2px 4px rgba(0, 0, 0, 0.5)",
        backgroundColor: isActiveChat ? "lightgray" : "white",
      }}
      onClick={() => changeCurrentActiveChat(chat.chat_id)}
    >
      <div
        className="circle"
        style={{
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          backgroundColor: "gray",
          marginRight: "10px",
        }}
      ></div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "220px",
          height: "50px",
        }}
      >
        Chat with user: {chat.chat_id}
      </div>
    </div>
  );
}