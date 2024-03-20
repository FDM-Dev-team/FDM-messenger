
import "./Login.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../services/userService";


const Login = ({ setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await loginUser(username, password);
    if (userData) {
      setCurrentUser(userData);
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };
  return (
    <div className="container">
      <div className="login-wrapper">
       <div className="logo">
          <img src="./smileyLogo.png" alt="Logo" />
        </div>
      <div className="login-box">
        <h2 className="title">Login to use FDM!</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="button-container">
          <button className="button" type="submit">Login</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Login;