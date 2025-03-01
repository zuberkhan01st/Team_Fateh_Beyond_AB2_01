"use client"; // Ensure this is a client-side component

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  MapPin,
  AlertTriangle,
  BarChart2,
  Settings,
  Clock,
  Activity,
  Shield,
  Zap,
  Thermometer,
  Camera,
  Video,
  Eye,
  AlertCircle,
  Check,
  Bell,
  Monitor,
  Navigation,
  Cpu,
  Database,
  Lock,
  CloudRain,
  Sun,
  Wind,
  RefreshCw,
  Radar,
  Radio,
  Plane,
  Codepen,
  Target,
} from "lucide-react";

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [liveAlerts, setLiveAlerts] = useState([]);
  const [systemHealth, setSystemHealth] = useState("Operational");
  const [responseTime, setResponseTime] = useState("1.8s");
  const [weatherConditions, setWeatherConditions] = useState("Clear");
  const [visibilityStatus, setVisibilityStatus] = useState("Excellent");
  const [activeZones, setActiveZones] = useState(["A1", "B3", "C2", "D4"]);
  const [threatClassification, setThreatClassification] = useState([
    { type: "UAV", count: 8, color: "#FF4500" },
    { type: "Birds", count: 23, color: "#FFD700" },
    { type: "Aircraft", count: 3, color: "#3B82F6" },
    { type: "Unknown", count: 2, color: "#9333EA" },
  ]);
  const [selectedCamera, setSelectedCamera] = useState("Camera-04");
  const [confidenceScore, setConfidenceScore] = useState(92);
  const [detectionRange, setDetectionRange] = useState("8.2km");

  // Simulate fetching live alerts and past incidents
  useEffect(() => {
    const fetchIncidents = () => {
      setIncidents([
        {
          id: 1,
          timestamp: "2025-03-01 09:32",
          location: "Sector A1",
          type: "UAV",
          classification: "Military",
          confidence: "98%",
          action: "Tracked",
          lat: 34.1491,
          lng: 77.5765,
        },
        {
          id: 2,
          timestamp: "2025-03-01 08:15",
          location: "Sector B3",
          type: "UAV",
          classification: "Commercial",
          confidence: "95%",
          action: "Reported",
          lat: 34.0891,
          lng: 77.5265,
        },
      ]);
    };

    const fetchLiveAlerts = () => {
      setLiveAlerts([
        {
          id: 1,
          message: "UAV detected in Sector A1",
          time: "09:32",
          severity: "High",
          camera: "Camera-04",
          speed: "42 km/h",
          altitude: "120m",
          heading: "NE",
        },
        {
          id: 2,
          message: "Multiple UAVs approaching Sector B3",
          time: "09:28",
          severity: "Critical",
          camera: "Camera-07",
          speed: "65 km/h",
          altitude: "95m",
          heading: "SW",
        },
      ]);
    };

    fetchIncidents();
    fetchLiveAlerts();

    // Simulate changing data with interval
    const interval = setInterval(() => {
      // Update confidence score with small variations
      setConfidenceScore((prev) =>
        Math.min(99, Math.max(85, prev + (Math.random() > 0.5 ? 1 : -1)))
      );

      // Occasionally change response time
      if (Math.random() > 0.8) {
        setResponseTime((1.5 + Math.random()).toFixed(1) + "s");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Function to determine alert severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "#FF0000";
      case "High":
        return "#FF4500";
      case "Medium":
        return "#FFD700";
      case "Low":
        return "#3B82F6";
      default:
        return "#3B82F6";
    }
  };

  // Load Leaflet CSS dynamically
  useEffect(() => {
    import("leaflet/dist/leaflet.css");
  }, []);

  // Load Leaflet and icons only on the client side
  let L, uavIcon, birdIcon, aircraftIcon, unknownIcon;
  if (typeof window !== "undefined") {
    L = require("leaflet");

    uavIcon = new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991662.png", // UAV Icon
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    birdIcon = new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/305/305879.png", // Bird Icon
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    aircraftIcon = new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/305/305873.png", // Aircraft Icon
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });

    unknownIcon = new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/6386/6386809.png", // Unknown Icon
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  }

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

  return (
    <div className="min-h-screen bg-[#0A0F1A] text-[#E2E8F0]">
      {/* Header */}
      <header className="py-4 px-8 bg-[#131E2F]/90 backdrop-blur-md border-b border-[#3B82F6]/50 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Radar className="w-8 h-8 text-[#3B82F6]" />
            <h1 className="text-2xl font-bold text-[#3B82F6]">
              AEGIS | Airborne Threat Detection System
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-[#3B82F6]" />
              <span className="text-[#E2E8F0] text-sm">3 Alerts</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-[#3B82F6]" />
              <span className="text-[#E2E8F0] text-sm">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            <Settings className="w-6 h-6 text-[#3B82F6]" />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="text-[#E2E8F0]">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-6">
        {/* System Status */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* System Health */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#131E2F]/80 backdrop-blur-md rounded-lg shadow-lg border border-[#3B82F6]/50 p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-6 h-6 text-[#3B82F6]" />
              <h3 className="text-lg font-bold text-[#3B82F6]">System Health</h3>
            </div>
            <p className="text-[#E2E8F0]">{systemHealth}</p>
          </motion.div>

          {/* Response Time */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#131E2F]/80 backdrop-blur-md rounded-lg shadow-lg border border-[#3B82F6]/50 p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-6 h-6 text-[#3B82F6]" />
              <h3 className="text-lg font-bold text-[#3B82F6]">Response Time</h3>
            </div>
            <p className="text-[#E2E8F0]">{responseTime}</p>
          </motion.div>

          {/* Weather Conditions */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#131E2F]/80 backdrop-blur-md rounded-lg shadow-lg border border-[#3B82F6]/50 p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Sun className="w-6 h-6 text-[#3B82F6]" />
              <h3 className="text-lg font-bold text-[#3B82F6]">
                Weather Conditions
              </h3>
            </div>
            <p className="text-[#E2E8F0]">{weatherConditions}</p>
          </motion.div>

          {/* Visibility Status */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#131E2F]/80 backdrop-blur-md rounded-lg shadow-lg border border-[#3B82F6]/50 p-4"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-6 h-6 text-[#3B82F6]" />
              <h3 className="text-lg font-bold text-[#3B82F6]">
                Visibility Status
              </h3>
            </div>
            <p className="text-[#E2E8F0]">{visibilityStatus}</p>
          </motion.div>
        </section>

        {/* Main Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Video Feed */}
            <motion.section
              whileHover={{ scale: 1.01 }}
              className="bg-[#131E2F]/80 backdrop-blur-md rounded-lg shadow-lg border border-[#3B82F6]/50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#3B82F6]/50">
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-[#3B82F6]" />
                  <h2 className="text-lg font-bold text-[#3B82F6]">
                    Live Video Feed
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-[#0A0F1A] px-2 py-1 text-xs rounded text-[#3B82F6] hover:bg-[#1E293B]"
                    onClick={() => setSelectedCamera("Camera-04")}
                  >
                    Camera-04
                  </button>
                  <button
                    className="bg-[#0A0F1A] px-2 py-1 text-xs rounded text-[#E2E8F0] hover:bg-[#1E293B]"
                    onClick={() => setSelectedCamera("Camera-07")}
                  >
                    Camera-07
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[#E2E8F0]">
                  Selected Camera: {selectedCamera}
                </p>
                <div className="mt-4 w-full h-64 bg-[#1E293B] rounded-lg"></div>
              </div>
            </motion.section>

            {/* Threat Map */}
            <motion.section
              whileHover={{ scale: 1.01 }}
              className="bg-[#131E2F]/80 backdrop-blur-md rounded-lg shadow-lg border border-[#3B82F6]/50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#3B82F6]/50">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-[#3B82F6]" />
                  <h2 className="text-lg font-bold text-[#3B82F6]">
                    Aerial Threat Map
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <button className="bg-[#0A0F1A] px-2 py-1 text-xs rounded text-[#3B82F6] hover:bg-[#1E293B]">
                    All Threats
                  </button>
                  <button className="bg-[#0A0F1A] px-2 py-1 text-xs rounded text-[#E2E8F0] hover:bg-[#1E293B]">
                    UAVs
                  </button>
                  <button className="bg-[#0A0F1A] px-2 py-1 text-xs rounded text-[#E2E8F0] hover:bg-[#1E293B]">
                    Aircraft
                  </button>
                </div>
              </div>
              <div className="p-4">
                {/* Map Component */}
                <MapContainer
                  center={[34.1491, 77.5765]} // Default center coordinates
                  zoom={10}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // OpenStreetMap tiles
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {incidents.map((incident) => (
                    <Marker
                      key={incident.id}
                      position={[incident.lat, incident.lng]}
                      icon={getIcon(incident.type)}
                    >
                      <Popup>
                        <div>
                          <p className="font-bold">{incident.type}</p>
                          <p>{incident.location}</p>
                          <p>Confidence: {incident.confidence}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </motion.section>

            {/* Past Incidents */}
            <motion.section
              whileHover={{ scale: 1.01 }}
              className="bg-[#131E2F]/80 backdrop-blur-md rounded-lg shadow-lg border border-[#3B82F6]/50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#3B82F6]/50">
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-[#3B82F6]" />
                  <h2 className="text-lg font-bold text-[#3B82F6]">
                    Past Incidents
                  </h2>
                </div>
                <button className="bg-[#0A0F1A] px-2 py-1 text-xs rounded text-[#3B82F6] hover:bg-[#1E293B]">
                  View All
                </button>
              </div>
              <ul className="p-4 space-y-2">
                {incidents.map((incident) => (
                  <li
                    key={incident.id}
                    className="flex items-center justify-between bg-[#1E293B] p-2 rounded-lg"
                  >
                    <div>
                      <p className="text-[#E2E8F0]">{incident.type}</p>
                      <p className="text-sm text-[#A0AEC0]">
                        {incident.timestamp} | {incident.location}
                      </p>
                    </div>
                    <Check className="w-5 h-5 text-[#3B82F6]" />
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Live Alerts */}
            <motion.section
              whileHover={{ scale: 1.01 }}
              className="bg-[#131E2F]/80 backdrop-blur-md rounded-lg shadow-lg border border-[#3B82F6]/50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#3B82F6]/50">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-[#3B82F6]" />
                  <h2 className="text-lg font-bold text-[#3B82F6]">
                    Live Alerts
                  </h2>
                </div>
                <button className="bg-[#0A0F1A] px-2 py-1 text-xs rounded text-[#3B82F6] hover:bg-[#1E293B]">
                  Clear All
                </button>
              </div>
              <ul className="p-4 space-y-2">
                {liveAlerts.map((alert) => (
                  <li
                    key={alert.id}
                    className="flex items-center justify-between bg-[#1E293B] p-2 rounded-lg"
                  >
                    <div>
                      <p className="text-[#E2E8F0]">{alert.message}</p>
                      <p className="text-sm text-[#A0AEC0]">
                        {alert.time} | {alert.severity}
                      </p>
                    </div>
                    <div
                      style={{
                        backgroundColor: getSeverityColor(alert.severity),
                      }}
                      className="w-2 h-2 rounded-full"
                    ></div>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Threat Classification */}
            <motion.section
              whileHover={{ scale: 1.01 }}
              className="bg-[#131E2F]/80 backdrop-blur-md rounded-lg shadow-lg border border-[#3B82F6]/50 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#3B82F6]/50">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="w-5 h-5 text-[#3B82F6]" />
                  <h2 className="text-lg font-bold text-[#3B82F6]">
                    Threat Classification
                  </h2>
                </div>
              </div>
              <ul className="p-4 space-y-2">
                {threatClassification.map((threat, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <p className="text-[#E2E8F0]">{threat.type}</p>
                    <div
                      style={{ backgroundColor: threat.color }}
                      className="w-4 h-4 rounded-full"
                    ></div>
                    <p className="text-[#E2E8F0]">{threat.count}</p>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
}