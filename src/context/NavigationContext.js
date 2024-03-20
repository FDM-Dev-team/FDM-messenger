import { useState, createContext, useContext, useEffect } from 'react';



const navigationContext = createContext()

export function NavigationProvider({ children }) {
  const [navagation, setNavagation] = useState('');



  const contextData = {
    navagation
  }
  return <navigationContext.Provider value={contextData}>{children}</navigationContext.Provider>
}

export function useNavigation() {
  return useContext(navigationContext)
}
