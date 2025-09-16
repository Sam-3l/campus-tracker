import React from "react";
import "../App.css";
import trackerPlaceholder from "../assets/tracker-placeholder.webp"; // replace with our real image later

export default function DeviceCard() {
  return (
    <div className="device-card">
      <img src={trackerPlaceholder} alt="Tracker Device" className="device-img" />
      <div className="device-info">
        <h2 className="device-title">Campus Tracker</h2>
        <p className="device-desc">
          A compact IoT tracking device powered by <strong>ESP32</strong>,{" "}
          <strong>LoRa</strong> for long-range communication, and{" "}
          <strong>GPS module</strong> for precise location tracking.
        </p>
        <ul className="device-specs">
          <li>✅ ESP32 Microcontroller</li>
          <li>✅ LoRa SX1276 Module</li>
          <li>✅ Neo-6M GPS Module</li>
          <li>✅ Built-in WiFi & Bluetooth</li>
          <li>✅ Low Power Consumption</li>
          <li>✅ Rechargeable Li-ion Battery</li>
        </ul>
      </div>
    </div>
  );
}