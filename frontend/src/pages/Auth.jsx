import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; 

export const Auth = ({ setIsLoggedIn }) => {
  return (
    <div className="auth">
      <Login setIsLoggedIn={setIsLoggedIn} />
      <Register />
    </div>
  );
};

const Login = ({ setIsLoggedIn }) => {
  const [_, setCookies] = useCookies(["access_token"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("https://recipebook1-20wl.onrender.com/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      localStorage.setItem("username", result.data.userID);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://recipebook1-20wl.onrender.com/auth/register", {
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
