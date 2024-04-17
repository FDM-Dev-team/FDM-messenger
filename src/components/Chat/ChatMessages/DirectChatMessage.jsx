import React, { useEffect, useState } from "react";
import "./ChatMessages.css";
import { useUser } from "../../../context/UserContext";
import SentChatMessage from "./SentChatMessage";
import ReceivedChatMessage from "./ReceivedChatMessage";

/**
 * Renders a direct chat message.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.message - The direct chat message object.
 * @returns {JSX.Element} The rendered direct chat message component.
 */
export default function DirectChatMessage({ message }) {
  const User = useUser();

  /**
   * Converts a timestamp to a formatted time string.
   *
   * @param {number} time - The timestamp to convert.
   * @returns {string} The formatted time string.
   */
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
      <ReceivedChatMessage message={message} convertTime={convertTime} />
  );
}
