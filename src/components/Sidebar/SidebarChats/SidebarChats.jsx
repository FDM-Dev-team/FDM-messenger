import React from "react";
import "./SidebarChats.css";
import axios from "axios";

export default function SideBarChats({ chat }) {
  const fetchThatChatMessage = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/chatmessage/${chat.chat_id}`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="d-flex align-items-center border my-1"
      style={{
        width: "300px",
        height: "75px",
        borderRadius: "20px",
        padding: "10px",
        cursor: "pointer",
        boxShadow: "-2px 2px 4px rgba(0, 0, 0, 0.5)",
      }}
      onClick={fetchThatChatMessage}
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
        {chat.name}
      </div>
    </div>
  );
}
