import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import api from "../services/api";
import "../App.css";
import "leaflet/dist/leaflet.css";

const primaryColor = "#4e54c8"; // theme color for markers, tooltip, ping

// Device icon
const deviceIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// Ping divIcon
const createPingIcon = () =>
  L.divIcon({
    className: "ping-icon",
    iconSize: [60, 60],
    iconAnchor: [30, 30], 
    html: `<div class="ping-circle"></div>`,
  });

// Recenter map when location updates
function Recenter({ lat, lng, zoom }) {
  const map = useMap();
  if (lat && lng) map.setView([lat, lng], zoom, { animate: true });
  return null;
}

export default function MapView() {
  const [locations, setLocations] = useState([]);
  const zoomLevel = 17; // closer zoom

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get("/api/devices/latest_location");
        if (res.data) {
          const loc = {
            ...res.data,
            lat: parseFloat(res.data.lat),
            lng: parseFloat(res.data.lng),
          };

          // 🔹 Reverse Geocode (OpenStreetMap Nominatim)
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${loc.lat}&lon=${loc.lng}&format=json`
          );
          const geoData = await geoRes.json();
          loc.address = geoData.display_name || "Unknown location";

          setLocations(prev => [...prev, loc]); // store history for trail
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocations();
    const interval = setInterval(fetchLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  const device = locations[locations.length - 1]; // latest location

  // Prepare polyline coordinates
  const pathCoords = locations.map(loc => [loc.lat, loc.lng]);

  return (
    <MapContainer
      center={device ? [device.lat, device.lng] : [6.5244, 3.3792]}
      zoom={zoomLevel}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {device && (
        <>
          <Recenter lat={device.lat} lng={device.lng} zoom={zoomLevel} />

          {/* Ping animation behind the marker */}
          <Marker position={[device.lat, device.lng]} icon={createPingIcon()} />

          {/* Device marker */}
          <Marker position={[device.lat, device.lng]} icon={deviceIcon}>
            <Tooltip
              direction="top"
              offset={[0, -25]}
              opacity={0.95}
              permanent={false}
              className="device-tooltip"
            >
              <div style={{ fontSize: "0.85rem", textAlign: "center" }}>
                <strong>{device.name || "Device"}</strong>
                <br />
                {new Date(device.timestamp).toLocaleString()}
                <br />
                <span style={{ fontSize: "0.75rem", opacity: 0.9 }}>
                  {device.address ? device.address.split(",")[0] : "Locating..."}
                </span>
              </div>
            </Tooltip>

            <Popup>
              <div style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
                <strong>{device.name || "Device"}</strong>
                <div>{new Date(device.timestamp).toLocaleString()}</div>
                <hr />
                <div>
                  📍 <em>{device.address || "Fetching location..."}</em>
                </div>
              </div>
            </Popup>
          </Marker>

          {/* Trail polyline */}
          {pathCoords.length > 1 && (
            <Polyline positions={pathCoords} color={primaryColor} weight={4} opacity={0.7} />
          )}
        </>
      )}
    </MapContainer>
  );
}
