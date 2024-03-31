import { useState, createContext, useContext, useEffect } from 'react';
import "./SidebarChats.css";
import axios from "axios";
import { useChat } from '../../../context/ChatContext'
import { useUser } from "../../../context/UserContext";
import { useNavigation } from '../../../context/NavigationContext';


export default function SideBarChats({ chat }) {
  const { changeCurrentActiveChat, currentActiveChat } = useChat();
  const [isActiveChat, setIsActiveChat] = useState(false);
  const { navagate } = useNavigation();
  const User = useUser();

  useEffect(() => {
    setIsActiveChat(currentActiveChat === chat.chat_id);
  }, [currentActiveChat, chat.chat_id]);



  return (
    <div
      className={`d-flex align-items-center border my-1 side-bar-chat ${isActiveChat ? 'active-chat' : ''}`}
      onClick={() => {
        changeCurrentActiveChat(chat.chat_id);
        navagate("chat")
      }}
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