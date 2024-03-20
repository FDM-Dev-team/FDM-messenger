import React, { useEffect,useContext } from "react";
import { useChat } from '../../context/ChatContext'

const Chat = () => {
  const { message, setMessage, chatLog, sendMessage, socket } = useChat();

  useEffect(() => {
    console.log("Chat socket:", socket);
  }, [socket]);

  return (
    <div className="col flex-grow-1 d-flex flex-column p-0" style={{ height: "100vh" }}>
      <div className="p-0 rounded" style={{
        marginBottom: "15px",
        marginTop: "15px",
        marginRight: "15px",
        marginLeft: "5px",
        flex: "1",
        boxShadow: "-4px 4px 10px rgba(0, 0, 0, 0.4)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <div>
          {chatLog.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <div className='mb-5'>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={
            sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
