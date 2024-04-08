import React, { useEffect, useState } from "react";
import "./ChatMessages.css";
import { useUser } from "../../../context/UserContext";
import SentChatMessage from "./SentChatMessage";
import GroupReceivedChatMessage from "./GroupReceivedChatMessage";


export default function GroupChatMessage({ message }) {
  const User = useUser();

  // useEffect(() => {
  //   console.log("User:", User.user.user_id)
  //   console.log("message:", message)
  // }, [message]);

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
    message.sender_id === User.user.user_id || message.sender_participant_id === User.user.user_id ?
    <SentChatMessage message={message} convertTime={convertTime} />
    :
    <GroupReceivedChatMessage message={message} convertTime={convertTime}/>
  );
}
