import React, { useState, useEffect } from "react";
import Layout from "./components/Layout";
import MapView from "./components/MapView";
import DeviceCard from "./components/DeviceCard";
import Login from "./components/Login";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setIsAuthenticated(true);

    // Load saved theme from localStorage if exists
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
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <div style={{ flex: 2, background: "#fff", padding: "1rem", borderRadius: "8px" }}>
          <MapView />
        </div>
        <div style={{ flex: 1, background: "#fff", padding: "1rem", borderRadius: "8px" }}>
          <DeviceCard />
        </div>
      </div>
    </Layout>
  );
}
