import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../services/api";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const devices = await api.get("/api/devices");
      const allLocations = [];
      for (let d of devices.data) {
        const loc = await api.get(`/api/devices/${d.id}/locations`);
        if (loc.data.length > 0) {
          const latest = loc.data[loc.data.length - 1];
          allLocations.push({ ...latest, name: d.name });
        }
      }
      setLocations(allLocations);
    };

    fetchLocations();
    const interval = setInterval(fetchLocations, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer center={[6.5244, 3.3792]} zoom={15} style={{ height: "80vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((loc, idx) => (
        <Marker key={idx} position={[loc.lat, loc.lng]}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;