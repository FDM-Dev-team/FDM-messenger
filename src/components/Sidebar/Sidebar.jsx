import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import useChatMiddleware from '../../context/ChatContext';
import axios from "axios";
import SideBarChats from "./SidebarChats/SidebarChats";

export default function Sidebar() {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/chat/list/1");
        setChatList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
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
          {chatList.map((chat) => (
            <SideBarChats key={chat.id} chat={chat} />
          ))}
        </div>
      </div>
    </div>
  );
}
