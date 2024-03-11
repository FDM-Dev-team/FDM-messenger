import React from "react";
import "./Login.css";
import smileyLogo from "../../assets/smileyLogo.png";
import UserService from "../../services/userService";

export default function Login() {
  const login = () => {
    const userService = new UserService();
    userService.login("username", "password");
  };
  return (
    <div className="container-fluid ">
      <div className="d-flex row align-items-center justify-content-center">
        {/* <div className="col-md-6 offset-md-3"> */}
        <div className="text-center">
          <img
            src={smileyLogo}
            alt="Logo"
            style={{ height: "60px", background: "white" }}
          />
          <p>Fluent Dialogue Message</p>
        </div>
        <div
          className="card"
          style={{
            width: "300px",
            height: "700px",
            boxShadow: "-4px 4px 10px rgba(0, 0, 0, 0.4)",
          }}
        ></div>
        {/* </div> */}
      </div>
    </div>
  );
}
