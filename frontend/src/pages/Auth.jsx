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
  const [_, setCookies] = useCookies(["token"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://recipebook-nlcw.onrender.com/login", {
        email,
        password,
      });

      setCookies("token", response.data.token, { path: "/" });
      localStorage.setItem("username", response.data.username);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://recipebook-nlcw.onrender.com/register", {
        email,
        username,
        password,
      });
      alert("Registration Completed! Now login.");
    } catch (error) {
      console.error(error);
      alert("Error registering user.");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
