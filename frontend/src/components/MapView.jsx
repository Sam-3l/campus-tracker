import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import api from "../services/api";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

// Fix for missing default marker icons in Vite/bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapView() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchLocations = async () => {
      try {
        const devices = await api.get("/api/devices");
        const allLocations = await Promise.all(
          devices.data.map(async (d) => {
            const res = await api.get(`/api/devices/${d.id}/locations`);
            if (!res.data || res.data.length === 0) return null;
            const latest = res.data[res.data.length - 1];
            return { ...latest, name: d.name };
          })
        );
        if (!mounted) return;
        setLocations(allLocations.filter(Boolean));
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocations();
    const id = setInterval(fetchLocations, 5000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="h-[60vh]">
      <MapContainer center={[6.5244, 3.3792]} zoom={15} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((loc, i) => (
          <Marker key={i} position={[loc.lat, loc.lng]}>
            <Popup>
              <div>
                <strong>{loc.name}</strong>
                <div className="text-sm">{new Date(loc.timestamp).toLocaleString()}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}