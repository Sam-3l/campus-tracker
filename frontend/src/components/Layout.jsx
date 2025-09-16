import React from "react";
import "../App.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      {/* Optional sidebar can be enabled later */}
      {/* <aside className="sidebar">
        <div className="sidebar-header">Campus Tracker</div>
        <nav className="sidebar-nav">
          <a href="#">Map</a>
          <a href="#">Devices</a>
          <a href="#">Settings</a>
        </nav>
      </aside> */}

      {/* Main content fills full viewport */}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default Layout;