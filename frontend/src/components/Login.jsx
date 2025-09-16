import React, { useState, useEffect } from "react";
import api from "../services/api";
import "./Login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/login", { username, password });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      onLogin();
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left visual section */}
      <div className="login-visual">
        <div className="visual-content">
          <img src="/images/tracker-placeholder.webp" alt="Illustration" />
          <h1>Welcome Back!</h1>
          <p>Log in to access your account and track your activities.</p>
        </div>
      </div>

      {/* Right login form section */}
      <div className={`login-form-container ${fadeIn ? "fade-in" : ""}`}>
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-submit">Login</button>
        </form>
      </div>
    </div>
  );
}