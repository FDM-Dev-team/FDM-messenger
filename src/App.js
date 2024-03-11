// import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div>
      {/* to do:
        add userService where we check if User is logged in or not
        if yes, then show Main page
        if no, then show Login page
      */}
      <Login />
      <Main />
    </div>
  );
}
export default App;
