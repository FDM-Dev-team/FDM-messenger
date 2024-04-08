import React from 'react'
import "./ChatMessages.css";

function SentChatMessage({ message, convertTime}) {
  return (
    <div className="message sent-message">
      <div className="message-text">{message.text}</div>
      <div className="message-time">{convertTime(message.time)}</div>
    </div>
  )
}

export default SentChatMessage