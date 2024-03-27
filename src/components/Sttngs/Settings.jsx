import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/userService";
import "./Settings.css";

export default function Settings() {

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  }

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

        <div className="profile-main">
          <button className="button-logout" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div>
    </div>
  );
}