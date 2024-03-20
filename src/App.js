import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import { useState, useEffect } from "react";
import { getLoggedInUser} from "./services/userService";

import { ChatProvider } from "./context/ChatContext";
import { FriendsProvider } from "./context/FriendsContext";
import { NavigationProvider } from "./context/NavigationContext";
import { UserProvider } from "./context/UserContext";

import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import UserService from "./services/userService";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const checkLoggedInUser = async () => {
      try {
        const user = await getLoggedInUser();
        setCurrentUser(user);
      } catch (error) {
        console.error("Error checking logged in user:", error);
      }
    };

    checkLoggedInUser();
  }, []);

  return (
    <NavigationProvider>
      <UserProvider>
        <FriendsProvider>
          <ChatProvider>
            <Routes>
              <Route path="/" element={currentUser ? <Main /> : <Navigate to="/login" />} />
              <Route path="/login" element={<Login setCurrentUser={setCurrentUser}/>} />
            </Routes>
          </ChatProvider>
        </FriendsProvider>
      </UserProvider>
    </NavigationProvider>
  );

};

export default App;
