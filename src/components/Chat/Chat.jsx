import React, { useEffect, useState } from "react";
import { useChat } from '../../context/ChatContext';
import "./Chat.css";
import axios from "axios";
import ChatMessages from "./ChatMessages/ChatMessages";
import { useUser } from "../../context/UserContext";
import { postMessage } from "../../services/chatService";



export default function Chat() {
  const { socket, message, setMessage, chatLog, setChatLog, sendMessage, currentActiveChat, recieveChatlog, connectToChatRoom, chatList } = useChat();
  const [messages, setMessages] = useState([]);
  const User = useUser();

  useEffect(() => {
    if (User && currentActiveChat && chatList) {
      const activeChat = chatList.find(chat => chat.chat_id === currentActiveChat);

      if (activeChat) {
        connectToChatRoom(activeChat, User.user.user_id);
      }
    }
  }, [currentActiveChat, User]);

  useEffect(() => {
    console.log("chatLog", chatLog)
  }, [chatLog]);

  useEffect(() => {
    if (currentActiveChat) {
      const fetchMessagesData = async () => {
        try {
          const response = await axios.get(`http://localhost:9000/chatmessage/${currentActiveChat}`);
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

    const activeChat = chatList.find(chat => chat.chat_id === currentActiveChat);

    if (activeChat) {
      sendMessage(currentActiveChat, User.user.user_id, activeChat);
      // postMessage(currentActiveChat, User.user.user_id, message);
    }

  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      send();
    }
  };

  const getChatName = () => {
    if (chatList && currentActiveChat) {
      const activeChat = chatList.find(chat => chat.chat_id === currentActiveChat);
      console.log("active chat:", activeChat)
      return activeChat.initials
    }
  }

  const getChatUserName = () => {
    if (chatList && currentActiveChat) {
      const activeChat = chatList.find(chat => chat.chat_id === currentActiveChat);
      console.log("active chat:", activeChat)
      return activeChat.name
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

        <div className="message-list" id="messageList" style={{ paddingInline: "20px", height: `calc(100vh - 200px)`, overflow: "scroll" }}>
          {Object.entries(chatLog)
            .filter(([key, value]) => value.chat_id === currentActiveChat)
            .map(([key, value], index) => (
              <ChatMessages key={`${currentActiveChat}-${index}`} messages={value} />
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