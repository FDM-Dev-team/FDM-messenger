import React, { useEffect,useContext } from "react";
import { useChat } from '../../context/ChatContext'

const Chat = () => {
  const { message, setMessage, chatLog, sendMessage, socket } = useChat();

  useEffect(() => {
    console.log("Chat socket:", socket);
  }, [socket]);

  return (
    <div
      className="col flex-grow-1 d-flex flex-column p-0"
      style={{ height: "100vh" }}
    >
      <div
        className="p-0 rounded"
        style={{
          marginBottom: "15px",
          marginTop: "15px",
          marginRight: "15px",
          marginLeft: "5px",
          flex: "1",
          boxShadow: "-4px 4px 10px rgba(0, 0, 0, 0.4)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="chatroom-header">
          <div
            className="circle"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              backgroundColor: "gray",
              marginBlock: "6px",
            }}
          ></div>
          <div className="chatroom-name">123</div>
        </div>
        <div className="flex-grow-1"></div>
        <div
          className="input-area"
          style={{
            height: "100px",
            padding: "10px",
            borderTop: "1px solid lightgray",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            className="icon"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "10%",
            }}
          >
            <span style={{ cursor: "pointer" }}>+</span>
          </div>
          <input
            type="text"
            placeholder="Enter your message"
            style={{
              width: "80%",
              height: "50px",
              padding: "15px",
              borderRadius: "5px",
              border: "1px solid lightgray",
            }}
          />
          <div
            className="icon"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "10%",
            }}
          >
            <span style={{ cursor: "pointer" }}>Send</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
