import axios from 'axios';

const BASE_URL = 'http://localhost:9000'; 

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
