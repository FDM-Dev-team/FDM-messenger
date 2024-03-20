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
<<<<<<< HEAD
    
      <Routes>
        <Route path="/" element={currentUser ? <Main /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser}/>} />
      </Routes>
   
=======
    <NavigationProvider>
      <UserProvider>
        <FriendsProvider>
          <ChatProvider>
          <div>
            {/* to do:
              add userService where we check if User is logged in or not
              if yes, then show Main page
              if no, then show Login page
            */}
            <Login />
            <Main />
          </div>
          </ChatProvider>
        </FriendsProvider>
      </UserProvider>
    </NavigationProvider>
>>>>>>> 1cc9a0a40d2355806818dc4fe1d19b6eebed90a1
  );

};

export default App;