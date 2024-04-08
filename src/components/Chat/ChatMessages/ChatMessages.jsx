import React from 'react'
import DirectChatMessage from './DirectChatMessage'
import GroupChatMessage from './GroupChatMessage'

function ChatMessages({ chatLog, activeChat }) {
  return (
    activeChat.chat_type === "DIRECT" ?
      <div className="message-list" id="messageList" style={{ paddingInline: "20px", height: `calc(100vh - 200px)`, overflowY: "auto", overflowX: "hidden" }}>
        {Object.entries(chatLog)
          .filter(([key, value]) => value.chat_id === activeChat.chat_id)
          .map(([key, value], index) => (
            <DirectChatMessage key={`${activeChat.chat_id}-${index}`} message={value} />
          ))}
      </div>
      :
      <div className="message-list" id="messageList" style={{ paddingInline: "20px", height: `calc(100vh - 200px)`, overflowY: "auto", overflowX: "hidden" }}>
        {Object.entries(chatLog)
          .filter(([key, value]) => value.chat_id === activeChat.chat_id)
          .map(([key, value], index) => (
            <GroupChatMessage key={`${activeChat.chat_id}-${index}`} message={value} />
          ))}
      </div>
  )
}

export default ChatMessages