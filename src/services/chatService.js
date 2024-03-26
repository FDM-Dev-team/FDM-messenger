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

export const postMessage = async (chat_id, sender_id, text, time) => {
  // const time = Date.now();

  try {
    // console.log(chat_id, sender_participant_Id, text, time);
    const response = await axios.post(`${BASE_URL}/chatmessage/post`, {
      chat_id,
      sender_id,
      text,
      time,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
