import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const friendsContext = createContext();

export function FriendsProvider({ children }) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await axios.get('http://localhost:9000/friends/1'); // Replace 'your-api-endpoint' with the actual API endpoint to get friends
      setFriends(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const contextData = {
    friends
  };

  return (
    <friendsContext.Provider value={contextData}>
      {children}
    </friendsContext.Provider>
  );
}

export function useFriends() {
  return useContext(friendsContext);
}