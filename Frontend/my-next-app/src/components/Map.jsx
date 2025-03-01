"use client"; // Ensure this is a client-side component

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L from "leaflet"; // Leaflet library for maps
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS for styling

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Custom Icons for Map Markers
const uavIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991662.png", // UAV Icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const birdIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/305/305879.png", // Bird Icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const aircraftIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/305/305873.png", // Aircraft Icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const unknownIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/6386/6386809.png", // Unknown Icon
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Function to get the appropriate icon based on object type
const getIcon = (type) => {
  switch (type) {
    case "UAV":
      return uavIcon;
    case "Birds":
      return birdIcon;
    case "Aircraft":
      return aircraftIcon;
    default:
      return unknownIcon;
  }
};

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
        <Marker key={incident.id} position={[incident.lat, incident.lng]} icon={getIcon(incident.type)}>
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