import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../services/api";
import "../App.css";

export default function MapView() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get("/api/devices/latest_location");
        setLocations([res.data]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLocations();
    const interval = setInterval(fetchLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="map-container">
      <MapContainer center={[6.5244, 3.3792]} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((loc, i) => (
          <Marker key={i} position={[loc.lat, loc.lng]}>
            <Popup>
              <div>
                <strong>{loc.name || "Device"}</strong>
                <div>{new Date(loc.timestamp).toLocaleString()}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}