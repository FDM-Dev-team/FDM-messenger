import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import UserService from "./services/userService";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const userService = new UserService(); // Create an instance of UserService
    setIsLogged(userService.isLoggedIn()); // Call isLoggedIn on the userService instance
  }, []);

  return <div>{isLogged ? <Main /> : <Login />}</div>;
}

export default App;
