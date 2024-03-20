import { useState, createContext, useContext, useEffect } from 'react';



const userContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState('');



  const contextData = {
    user
  }
  return <userContext.Provider value={contextData}>{children}</userContext.Provider>
}

export function useUser() {
  return useContext(userContext)
}
