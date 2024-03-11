import React from "react";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="row flex-grow-1 justify-content-center">
      <div
        className="p-0 rounded"
        style={{
          width: "330px",
          marginBottom: "15px",
          marginTop: "10px",
          marginRight: "15px",
          marginLeft: "15px",
          boxShadow: "-4px 4px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        chats
      </div>
    </div>
  );
}
