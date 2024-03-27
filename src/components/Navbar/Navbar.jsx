import { useState, createContext, useContext, useEffect } from 'react';
import "./Navbar.css";
import smileyLogo from "../../assets/smileyLogo.png";
import { FaUserFriends, FaUser, FaFacebookMessenger, FaTools } from 'react-icons/fa';
import { useNavigation } from '../../context/NavigationContext';
import { useUser } from "../../context/UserContext";


export default function Navbar({ onNavbarItemClick }) {
  const User = useUser();
  const { navagation } = useNavigation();

  useEffect(() => {
    console.log("user info:", User);
  }, [User]);

  const initials = User.user?.initials || ""; // Defensive coding for User.user.initials

  return (
    <div>
      <div
        className="row align-items-center d-flex justify-content-center"
        style={{ height: "40px", background: "white" }}
      >
        <div className="col-1 p-0">
          <img
            src={smileyLogo}
            alt="Logo"
            style={{ height: "40px", width: "40px" }}
          />
        </div>
        <div
          className="col-6 p-0"
          style={{ fontSize: "14px", marginLeft: "15px" }}
        >
          Fluent Dialogue Messenger
        </div>
      </div>
      <div
        className="row d-flex justify-content-center"
        style={{ height: "85px" }}
      >
        <div
          className="row my-1 justify-content-center rounded-pill p-0"
          style={{
            width: "320px",
            marginLeft: "0px",
            marginRight: "0px",
            boxShadow: "-4px 4px 10px rgba(0, 0, 0, 0.4)",
            color: "#55595d"
          }}
        >
          <div
            className="m-1 rounded-circle friends-icon-container"
            id={navagation === "profile" ? "navCircleOn" : "navCircleOff"}
            onClick={() => onNavbarItemClick("profile")}
          >
            <div className='user-avatar' style={{color: "#55595d"}}>
              {initials}
            </div>
          </div>
          <div
            className="m-1 rounded-circle friends-icon-container"
            id={navagation === "friends" ? "navCircleOn" : "navCircleOff"}
            onClick={() => onNavbarItemClick("friends")}
          >
            <FaUserFriends size={40} />
          </div>
          <div
            className="m-1 rounded-circle friends-icon-container"
            id={navagation === "chat" ? "navCircleOn" : "navCircleOff"}
            onClick={() => onNavbarItemClick("chat")}
          >
            <FaFacebookMessenger size={32} />
          </div>
          <div
            className="m-1 rounded-circle friends-icon-container"
            id={navagation === "settings" ? "navCircleOn" : "navCircleOff"}
            onClick={() => onNavbarItemClick("settings")}
          >
            <FaTools size={32} />
          </div>
        </div>
      </div>
    </div>
  );
}
