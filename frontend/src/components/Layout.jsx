import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Campus Tracker
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="block p-2 rounded hover:bg-gray-700">📍 Map</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">📋 Devices</a>
          <a href="#" className="block p-2 rounded hover:bg-gray-700">⚙ Settings</a>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button className="w-full bg-red-600 p-2 rounded">Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded px-3 py-1"
            />
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
