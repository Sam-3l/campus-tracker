import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import MapView from "./components/MapView";
import DeviceCard from "./components/DeviceCard";
import Login from "./components/Login";
import "./App.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setIsAuthenticated(true);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <Layout>
      {/* Header */}
      <div className="app-header">
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Main content */}
      <div className="app-main">
        <div className="map-container">
          <MapView />
        </div>
        <div className="device-container">
          <DeviceCard />
        </div>
      </div>
    </Layout>
  );
}
