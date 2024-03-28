import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService";
import "./Settings.css";

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
          <form onSubmit={handleSubmit}>
            <section id="appearance">
              <h2>Appearance</h2>
              <div className="settings-line-break"></div>
              <label htmlFor="theme">Theme:</label>
              <select id="theme" name="theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
              </select>

              <label htmlFor="fontSize">Font Size:</label>
              <select id="fontSize" name="fontSize" value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
              </select>
            </section>

            <section id="messaging">
              <h2>Messaging</h2>
              <div className="settings-line-break"></div>
              <label htmlFor="muteNotifications">Mute Notifications:</label>
              <select
                id="muteNotifications"
                name="muteNotifications"
                value={mute}
                onChange={(e) => setMute(e.target.value)}
              >
                <option value="Unmute">Unmute</option>
                <option value="Mute">Mute</option>
              </select>
            </section>

            <button type="submit">Update Settings</button>
          </form>
          <button className="button-logout" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}
