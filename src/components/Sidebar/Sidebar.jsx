import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import axios from "axios";
import SideBarChats from "./SidebarChats/SidebarChats";
import { useChat } from '../../context/ChatContext';
import { useUser } from "../../context/UserContext";
import { Socket } from "socket.io-client";

export default function Sidebar() {
  const { changeCurrentActiveChat, chatList, updateChatList, socket } = useChat();
  const User = useUser();



  useEffect(() => {
    const fetchData = async () => {
      try {
        if (User.user && User.user.user_id) {
          const response = await axios.get(`http://localhost:9000/chat/list/${User.user.user_id}`);
          updateChatList(response.data);
          console.log("chat list:", response.data);
          const firstChat = response.data.find(chat => chat.chat_id !== User.user.user_id);
          if (firstChat) {
            changeCurrentActiveChat(firstChat.chat_id);
          }
        }
      } catch (error) {
        console.error(error);
      } <s></s>
    };

    fetchData();
  }, [User]);

  return ( chatList &&
    <div className="row flex-grow-1 justify-content-center">
      <div
        className="p-0 rounded d-flex flex-column justify-content-start align-items-center"
        style={{
          width: "330px",
          height: "calc(100vh - 150px)",
          marginBottom: "15px",
          marginTop: "10px",
          marginRight: "15px",
          marginLeft: "15px",
          boxShadow: "-4px 4px 10px rgba(0, 0, 0, 0.4)",
          overflowY: "scroll",
        }}
      >
        <div
          className="d-flex flex-column justify-content-start align-items-center"
          style={{
            height: "fit-content",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >

          {chatList.map((chat, index) => (
            <SideBarChats key={chat.id || index} chat={chat} />
          ))}
        </div>
      </div>
    </div>
  );
}
