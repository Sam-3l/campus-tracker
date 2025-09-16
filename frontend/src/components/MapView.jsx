import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import api from "../services/api";
import "../App.css";
import "leaflet/dist/leaflet.css";

// Base device icon
const deviceIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Animated ping icon using divIcon
const createPingIcon = () =>
  L.divIcon({
    className: "ping-icon",
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    html: `<div class="ping-circle"></div>`,
  });

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
    const interval = setInterval(fetchLocations, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[6.5244, 3.3792]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {locations.map((loc, i) => (
        <React.Fragment key={i}>
          {/* Ping animation */}
          <Marker position={[loc.lat, loc.lng]} icon={createPingIcon()} />

          {/* Actual device icon */}
          <Marker position={[loc.lat, loc.lng]} icon={deviceIcon}>
            <Tooltip direction="top" offset={[0, -20]} opacity={0.9} permanent={false}>
              <div style={{ textAlign: "center", fontSize: "0.85rem" }}>
                <strong>{loc.name || "Device"}</strong>
                <br />
                {new Date(loc.timestamp).toLocaleString()}
              </div>
            </Tooltip>

            <Popup>
              <div style={{ fontSize: "0.9rem" }}>
                <strong>{loc.name || "Device"}</strong>
                <div>{new Date(loc.timestamp).toLocaleString()}</div>
              </div>
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
    </MapContainer>
  );
}