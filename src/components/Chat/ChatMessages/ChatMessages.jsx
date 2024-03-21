import React from "react";
import "./ChatMessages.css";

export default function ChatMessages({ messages }) {

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
      className={`message ${messages.sender === 1
        ? "sent-message"
        : "recieved-message"
        }`}
    >
      <div className="message-text">{messages.message}</div>
      <div className="message-time">{convertTime(messages.sentTime)}</div>
    </div>
  );
}
