import { useState, createContext, useContext, useEffect } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const userIsAuthenticated = () => {
    return localStorage.getItem("user") !== null;
  };

  const userLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const userLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const contextData = {
    user,
    getUser,
    userIsAuthenticated,
    userLogin,
    userLogout,
  };

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
}

export default UserContext;

export function useUser() {
  return useContext(UserContext);
}

export { UserProvider };
