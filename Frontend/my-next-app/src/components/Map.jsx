"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

export default function Map({ incidents }) {
  const center = [34.1491, 77.5765]; // Jammu and Kashmir coordinates

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: "400px", width: "100%", borderRadius: "8px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {incidents.map((incident) => (
        <Marker key={incident.id} position={[incident.lat, incident.lng]}>
          <Popup>
            <div className="text-sm">
              <p className="font-bold">{incident.type}</p>
              <p>Location: {incident.location}</p>
              <p>Confidence: {incident.confidence}</p>
              <p>Action: {incident.action}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}