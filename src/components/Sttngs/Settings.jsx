import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService";
import "./Settings.css";
import { FaBellSlash, FaMoon, FaClock, FaSun, FaKey } from "react-icons/fa";

export default function Settings() {

  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("M");
  const [mute, setMute] = useState("Unmute");

  useEffect(() => {
    const theme_cookie = getCookie("theme")
    const fontSize_cookie = getCookie("fontSize")
    const mute_cookie = getCookie("mute")

    if (theme_cookie) {
      setTheme(theme_cookie);
    }

    if (fontSize_cookie) {
      setFontSize(fontSize_cookie);
    }

    if (mute_cookie) {
      setMute(mute_cookie);
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    // Save the theme and font size to cookies
    setCookie('theme', theme);
    setCookie('fontSize', fontSize);
    setCookie('mute', mute)

    // Perform other actions with the updated settings
    console.log('Form submitted: ' + theme + ', ' + fontSize);
  };

  const setCookie = (name, value) => {
    document.cookie = `${name}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <div
      className="col flex-grow-1 d-flex flex-column p-0"
      style={{ height: "100vh" }}
    >
      <div
        className=" p-0 rounded"
        style={{
          marginBottom: "15px",
          marginTop: "15px",
          marginRight: "15px",
          marginLeft: "5px",
          flex: "1",
          boxShadow: "-4px 4px 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="profile-header">Settings</div>

        <div className="settings-main">
          <div className="sttngs-box">
            <FaSun size={44} />
            <p style={{ paddingTop: "10px" }}>Theme</p>

            {/* <FaMoon size={40} /> */}
          </div>
          <div className="sttngs-box" style={{}}>
            <FaBellSlash size={48} />
            <p style={{ paddingTop: "10px" }}>Notifications</p>

          </div>
          <div className="sttngs-box">
            <FaClock size={40} />
            <p style={{ paddingTop: "10px" }}>Show activity</p>

          </div>
          <div className="sttngs-box">
            <FaKey size={40} />
            <p style={{ paddingTop: "10px" }}>Change Password</p>

          </div>
          <button className="button-logout" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}
