import React, { useEffect, useState } from "react";
import { useChat } from '../../context/ChatContext';
import "./Chat.css";
import axios from "axios";
import ChatMessages from "./ChatMessages/ChatMessages";
import { useUser } from "../../context/UserContext";
import { postMessage } from "../../services/chatService";


export default function Chat() {
  const { message, setMessage, chatLog, setChatLog, sendMessage, currentActiveChat, recieveChatlog, connectToChatRoom } = useChat();
  const [messages, setMessages] = useState([]);
  const User = useUser();

  useEffect(() => {
    if (User && User.user) {
      connectToChatRoom(currentActiveChat, User.user.user_id);
    }
  }, [currentActiveChat, User]);

  useEffect(() => {
    console.log("chatLog", chatLog)
  }, [chatLog]);

  useEffect(() => {
    const fetchMessagesData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/chatmessage/${currentActiveChat}`);
        recieveChatlog(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessagesData();
  }, []);

  const send = () => {
    console.log("User.user", User.user)
    sendMessage(currentActiveChat, User.user.user_id);
    postMessage(currentActiveChat, User.user.user_id, message);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      send();
    }
  };

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

        <div className="message-list" style={{ paddingInline: "20px", height: `calc(100vh - 200px)`, overflow: "scroll" }}>
          {Object.entries(chatLog)
            .filter(([key, value]) => value.sender_participant_id === currentActiveChat || (value.sender_participant_id === User.user.user_id && value.chat_id === currentActiveChat))
            .map(([key, value]) => (
              <ChatMessages key={value.message_id || key} messages={value} />
            ))}
        </div>

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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress} // Handle Enter key press
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
            <button onClick={send}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}