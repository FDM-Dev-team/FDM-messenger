import axios from "axios";

const BASE_URL = "http://localhost:9000";

export const fetchChat = async (chatId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chat/${chatId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchChatList = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chat/list/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getChatParticipantByChatId = async (chatId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/chatparticipant/chat/${chatId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving chat participant by chat ID:", error);
    throw error;
  }
};

export const getChatParticipantByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/chatparticipant/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving chat participant by user ID:", error);
    throw error;
  }
};

export const getChatMessageByChatId = async (chatId) => {
  try {
    const response = await axios.get(`${BASE_URL}/chatmessage/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving chat message by chat ID:", error);
    throw error;
  }
};
