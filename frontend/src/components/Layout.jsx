import React from "react";
import "../App.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <aside className="sidebar">
        <div className="sidebar-header">Campus Tracker</div>
        <nav className="sidebar-nav">
          <a href="#">Map</a>
          <a href="#">Devices</a>
          <a href="#">Settings</a>
        </nav>
        <div className="sidebar-footer">
          <button className="btn-logout">Logout</button>
        </div>
      </aside>
      <div className="main-content">
        <header className="topbar">
          <h1>Dashboard</h1>
          <div className="topbar-actions">
            <input type="text" placeholder="Search..." />
            <img src="https://via.placeholder.com/40" alt="Profile" />
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
