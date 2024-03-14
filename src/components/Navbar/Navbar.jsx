import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div>
      <div
        className="row align-items-center d-flex justify-content-center"
        style={{ height: "40px", background: "white" }}
      >
        <div className="col-1 p-0">
          <img
            src="./smileyLogo.png"
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
          }}
        >
          <div
            className="bg-info m-1 rounded-circle"
            style={{ height: "70px", width: "70px" }}
          >
            1
          </div>
          <div
            className="bg-info m-1 rounded-circle"
            style={{ height: "70px", width: "70px" }}
          >
          </div>
          <div
            className="bg-info m-1 rounded-circle"
            style={{ height: "70px", width: "70px" }}
          >
            3
          </div>
          <div
            className="bg-info m-1 rounded-circle"
            style={{ height: "70px", width: "70px" }}
          >
            4
          </div>
        </div>
      </div>
    </div>
  );
}
