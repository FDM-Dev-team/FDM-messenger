import axios from 'axios';

const BASE_URL = 'http://localhost:9000'; 

export const fetchFriendList = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/friends/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};