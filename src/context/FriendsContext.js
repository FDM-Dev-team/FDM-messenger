import { useState, createContext, useContext, useEffect } from 'react';



const friendsContext = createContext()

export function FriendsProvider({ children }) {
  const [friends, setFriends] = useState('');



  const contextData = {
    friends
  }
  return <friendsContext.Provider value={contextData}>{children}</friendsContext.Provider>
}

export function useFriends() {
  return useContext(friendsContext)
}
