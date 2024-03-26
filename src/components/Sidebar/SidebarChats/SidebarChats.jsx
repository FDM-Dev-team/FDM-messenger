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
      <div className="chat-table-cell-avatar" >
        <div className="chat-avatar"
          id='ProfileCircle'
        // style={{
        //   backgroundColor: getRandomColor(),
        //   color: getRandomTextColor(getRandomColor()),
        // }}
        >
          {chat.initials}</div>
      </div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          width: "220px",
          height: "50px",
        }}
      >
        {chat.name}
      </div>
    </div >
  );
}