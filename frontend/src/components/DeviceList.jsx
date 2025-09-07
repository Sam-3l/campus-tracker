import React, { useEffect, useState } from "react";
import api from "../services/api";

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
    <div>
      <h3 className="text-lg font-semibold mb-3">Devices</h3>
      <div className="overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Device</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Dev EUI</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Last</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {devices.map(d => (
              <tr key={d.id}>
                <td className="px-4 py-2">{d.name}</td>
                <td className="px-4 py-2 text-sm text-gray-600">{d.dev_eui}</td>
                <td className="px-4 py-2 text-sm text-gray-600">Check Map</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
