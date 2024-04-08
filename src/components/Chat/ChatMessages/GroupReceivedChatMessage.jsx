import React from 'react'
import "./ChatMessages.css";

function GroupReceivedChatMessage({ message, convertTime }) {
  console.log(message)
  return (
    <div className="message received-message">
      <div className="chatroom-table-cell-avatar">
        <div className="chatroom-avatar" id="UserProfileCircle">
          {message.sender_name}
        </div>
      </div>
      <div className="message-text">{message.text}</div>
      <div className="message-time">{convertTime(message.time)}</div>
    </div>
  )
}

export default GroupReceivedChatMessage