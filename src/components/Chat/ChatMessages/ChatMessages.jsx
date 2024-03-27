import React, { useEffect, useState } from "react";
import "./ChatMessages.css";
import { useUser } from "../../../context/UserContext";


export default function ChatMessages({ messages }) {
  const User = useUser();

  // useEffect(() => {
  //   console.log("User:", User.user.user_id)
  //   console.log("messages:", messages)
  // }, [messages]);

  const convertTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedHours = hours % 12 || 12;
    const period = hours >= 12 ? "PM" : "AM";
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}${period}`;
  };
  return (
    <div
      className={`message ${messages.sender_id === User.user.user_id || messages.sender_participant_id === User.user.user_id
        ? "sent-message"
        : "recieved-message"
        }`}
    >
      <div className="message-text">{messages.text}</div>
      <div className="message-time">{convertTime(messages.time)}</div>
    </div>
  );
}
