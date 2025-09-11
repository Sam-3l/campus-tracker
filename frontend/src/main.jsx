import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "leaflet/dist/leaflet.css"; // leaflet CSS for map

// Add a Tailwind test element to verify integration
const TestTailwind = () => (
  <div className="bg-blue-500 text-white p-4 rounded-lg">
    Tailwind is working!
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div>
      <TestTailwind />
      <App />
    </div>
  </React.StrictMode>
);