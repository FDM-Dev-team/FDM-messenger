import React, { useEffect, useState } from "react";
import { useChat } from '../../context/ChatContext';
import "./Chat.css";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { postMessage } from "../../services/chatService";
import ChatMessages from "./ChatMessages/ChatMessages";



export default function Chat() {
  const { socket, message, setMessage, chatLog, setChatLog, sendMessage, currentActiveChat, recieveChatlog, connectToChatRoom, chatList } = useChat();
  const [messages, setMessages] = useState([]);
  const User = useUser();

  useEffect(() => {
    if (User && currentActiveChat) {
        connectToChatRoom(currentActiveChat.chat_id, User.user.user_id);
    }
  }, [currentActiveChat, User]);

  useEffect(() => {
    console.log("chatLog", chatLog)
  }, [chatLog]);

  useEffect(() => {
    if (currentActiveChat) {
      const fetchMessagesData = async () => {
        try {
          const response = await axios.get(`http://localhost:9000/chatmessage/${currentActiveChat.chat_id}`);
          recieveChatlog(response.data);
          //console.log(response.data);
          scrollToBottom(); // Scroll to bottom after fetching messages
        } catch (error) {
          console.error(error);
        }
      };

      fetchMessagesData();
    }
  }, [currentActiveChat]);

  useEffect(() => {
    scrollToBottom();
  }, [chatLog]);

  const scrollToBottom = () => {
    const messageList = document.getElementById("messageList");
    if (messageList) {
      messageList.scrollTop = messageList.scrollHeight;
    }
  };

  const send = () => {
    console.log("chatList send", chatList)

    if (currentActiveChat) {
      sendMessage(currentActiveChat.chat_id, User.user.user_id);
      // postMessage(currentActiveChat, User.user.user_id, message);
    }

  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  const getChatName = () => {
    if (currentActiveChat) {
      return currentActiveChat.initials
    }
  }

  const getChatUserName = () => {
    if (currentActiveChat) {
      return currentActiveChat.name
    }
  }

  return (
    <div
      className="col flex-grow-1 d-flex flex-column p-0"
      style={{ height: "100vh" }}
    >
      <div className="chat-container p-0 rounded">
        <div className="chatroom-header" style={{}}>
          <div className="friends-table-cell-avatar" style={{ paddingTop: "5px", paddingLeft: "0px" }}>
            <div className="friends-avatar" id="UserProfileCircle">
              {getChatName()}</div>
          </div>
          <div className="chatroom-name">{getChatUserName()}</div>
        </div>

        <ChatMessages chatLog={chatLog} activeChat={currentActiveChat} />

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
          >

          </input>
          <button className="btn btn-primary" id="sendButton" onClick={send}>Send</button>


        </div>
      </div>
    </div>

  );
}