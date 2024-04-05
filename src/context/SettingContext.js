import { useState, createContext, useContext, useEffect } from 'react';

const SettingContext = createContext()

function SettingProvider({ children }) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')? localStorage.getItem('theme') : "light";
    if (storedTheme === "dark") {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, [])

  useEffect(() => {
    setBodyAttribute(theme);
  }, [theme])

  const setBodyAttribute = (theme) => {
    document.querySelector("body").setAttribute("data-theme", theme);
  }

  const setDarkMode = () => {
    localStorage.setItem("theme", "dark");
    setTheme("dark");
  }

  const setLightMode = () => {
    localStorage.setItem("theme", "light");
    setTheme("light");
  }


  const contextData = {
    theme,
    setDarkMode,
    setLightMode
  }

  return (
    <SettingContext.Provider value={contextData}>
      {children}
    </SettingContext.Provider>
  )
}

export default SettingContext

export function useSetting() {
  return useContext(SettingContext)
}

export { SettingProvider }