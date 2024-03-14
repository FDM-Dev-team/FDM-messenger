import React, { useEffect } from "react";
import "./Main.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";
import useChatMiddleware from '../../middleware/ChatMiddleware';
import { Socket } from "socket.io-client";

export default function Main() {
  const { connectPeronalChannel , socket} = useChatMiddleware();

  useEffect(() => {
    connectPeronalChannel();
  }, []);

  useEffect(() => {
    console.log("main socket:", socket);
  }, [socket]);


  return (
    <div className="App d-flex min-vh-100">
      <div
        className="container-fluid flex-grow-1"
        style={{ paddingLeft: "15px" }}
      >
        <div className="row h-100">
          <div
            className="col-2 d-flex flex-column p-0"
            style={{ width: "350px" }}
          >
            <Navbar />
            <Sidebar />
          </div>
          <div
            className="col flex-grow-1 d-flex flex-column p-0"
            style={{ height: "100vh" }}
          >
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}
