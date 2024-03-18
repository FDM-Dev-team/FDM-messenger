import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/user/1");
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfileData();
  }, []);
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
        <h2>Profile</h2>
        <div>
          <strong>Name:</strong> {profile.username}
        </div>
        <div>
          <strong>Email:</strong> {profile.email}
        </div>
      </div>
    </div>
  );
}
