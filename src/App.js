// import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Routes, Route } from "react-router-dom";

import { ChatProvider } from "./context/ChatContext";
import { FriendsProvider } from "./context/FriendsContext";
import { NavigationProvider } from "./context/NavigationContext";
import { UserProvider } from "./context/UserContext";

import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";

function App() {
  return (
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
  );
}
export default App;
