import React, { useState, useEffect, useRef } from "react";
import api from "../services/api";
import "./Login.css";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const visualRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = visualRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      visualRef.current.style.setProperty("--spot-x", `${x}px`);
      visualRef.current.style.setProperty("--spot-y", `${y}px`);
    };
    const current = visualRef.current;
    current.addEventListener("mousemove", handleMouseMove);
    return () => current.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", { username, password });
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      onLogin();
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left visual section */}
      <div className="login-visual" ref={visualRef}>
        <div className="overlay"></div>
        <div className="visual-content">
          <h1>Campus Wide Human & Asset Tracker</h1>
          <h2>Welcome Back</h2>
          <p>Login to access your account</p>
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? (
              <span className="loading-content">
                <span className="spinner"></span> Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
