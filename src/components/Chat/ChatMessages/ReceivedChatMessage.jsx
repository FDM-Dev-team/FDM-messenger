import React from 'react'
import "./ChatMessages.css";

function ReceivedChatMessage({ message, convertTime}) {
  return (
    <div className="message received-message">
      <div className="message-text">{message.text}</div>
      <div className="message-time">{convertTime(message.time)}</div>
    </div>
  )
}

export default ReceivedChatMessage