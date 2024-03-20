import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    }
};

export const loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { username, password });
      const user = response.data;

    console.log("userservice login", user)
    return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
  };

  export const getLoggedInUser = () => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  };

  export const logoutUser = () => {
    localStorage.removeItem('user');
  };
