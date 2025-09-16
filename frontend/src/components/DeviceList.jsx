import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../App.css";

export default function DeviceList() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/api/devices");
        setDevices(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetch();
  }, []);

  return (
    <div className="device-list-container">
      <h3>Devices</h3>
      <table className="device-table">
        <thead>
          <tr>
            <th>Device</th>
            <th>Dev EUI</th>
            <th>Last</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.dev_eui}</td>
              <td>Check Map</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
