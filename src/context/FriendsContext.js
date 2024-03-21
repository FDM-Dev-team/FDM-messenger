import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext'; // Assuming you have a UserContext

const friendsContext = createContext();

export function FriendsProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const { user } = useUser(); // Get the user object from UserContext

  useEffect(() => {
    if (user) {
      fetchFriends(user.user_id); // Pass the user's ID to the fetchFriends function
    }
  }, [user]);

  const fetchFriends = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:9000/friends/${userId}`);
      setFriends(response.data);
      //console.log(response.data);
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