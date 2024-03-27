import { useState, createContext, useContext, useEffect } from "react";

const navigationContext = createContext();

export function NavigationProvider({ children }) {
  const [navagation, setNavagation] = useState("profile");

  const navagate = (destination) => {
    setNavagation(destination);
  };

  const contextData = {
    navagation,
    navagate,
  };
  return (
    <navigationContext.Provider value={contextData}>
      {children}
    </navigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(navigationContext);
}
