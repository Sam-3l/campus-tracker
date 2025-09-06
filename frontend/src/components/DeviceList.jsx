import React, { useEffect, useState } from "react";
import api from "../services/api";

const DeviceList = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      const res = await api.get("/api/devices");
      setDevices(res.data);
    };
    fetchDevices();
  }, []);

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Device</th>
            <th>Dev EUI</th>
            <th>Last Location</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(d => (
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
};

export default DeviceList;
