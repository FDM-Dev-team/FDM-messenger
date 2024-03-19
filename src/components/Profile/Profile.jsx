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
        <div className="profile-header">Profile</div>

        <div className="profile-main">
          <div
            className="circle"
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundColor: "lightgray",
              boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.5)",
              marginBottom: "10px",
            }}
          ></div>
          <div className="profile-name">
            {profile.firstname} {profile.lastname}
          </div>
          <div className="profile-username"> @{profile.username} </div>
          <div className="profile-line-break"></div>
          <div className="profile-email"> {profile.email} </div>
          <div className="profile-friend"> Friends: {} </div>
        </div>
      </div>
    </div>
  );
}
