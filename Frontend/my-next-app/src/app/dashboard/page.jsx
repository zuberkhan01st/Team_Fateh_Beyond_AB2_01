"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";

export default function Dashboard() {
  const [incidents, setIncidents] = useState([]);
  const [liveAlerts, setLiveAlerts] = useState([]);
  const [systemHealth, setSystemHealth] = useState("Good");
  const [responseTime, setResponseTime] = useState("2.5s");

  // Simulate fetching live alerts and past incidents
  useEffect(() => {
    const fetchIncidents = () => {
      setIncidents([
        { id: 1, timestamp: "2023-10-01 10:00", location: "Zone A", type: "Drone" },
        { id: 2, timestamp: "2023-10-01 12:30", location: "Zone B", type: "Missile" },
        { id: 3, timestamp: "2023-10-02 09:15", location: "Zone C", type: "Bird" },
      ]);
    };

    const fetchLiveAlerts = () => {
      setLiveAlerts([
        { id: 1, message: "Drone detected in Zone A", time: "10:00" },
        { id: 2, message: "Missile detected in Zone B", time: "12:30" },
      ]);
    };

    fetchIncidents();
    fetchLiveAlerts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#E2E8F0]">
      {/* Header */}
      <header className="py-6 px-8 bg-[#1E293B]/80 backdrop-blur-md border-b border-[#3B82F6]/50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#3B82F6]">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Settings className="w-6 h-6 text-[#3B82F6]" />
            <span className="text-[#E2E8F0]">Welcome, Admin</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-10">
        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#1E293B]/80 backdrop-blur-md p-6 rounded-lg shadow-lg border border-[#3B82F6]/50"
          >
            <div className="flex items-center space-x-4">
              <Zap className="w-8 h-8 text-[#3B82F6]" />
              <div>
                <p className="text-[#E2E8F0]">Live Threats</p>
                <p className="text-2xl font-bold text-[#3B82F6]">2</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#1E293B]/80 backdrop-blur-md p-6 rounded-lg shadow-lg border border-[#3B82F6]/50"
          >
            <div className="flex items-center space-x-4">
              <Clock className="w-8 h-8 text-[#3B82F6]" />
              <div>
                <p className="text-[#E2E8F0]">Avg. Response Time</p>
                <p className="text-2xl font-bold text-[#3B82F6]">{responseTime}</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-[#1E293B]/80 backdrop-blur-md p-6 rounded-lg shadow-lg border border-[#3B82F6]/50"
          >
            <div className="flex items-center space-x-4">
              <Activity className="w-8 h-8 text-[#3B82F6]" />
              <div>
                <p className="text-[#E2E8F0]">System Health</p>
                <p className="text-2xl font-bold text-[#3B82F6]">{systemHealth}</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Live Alerts */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Live Alerts</h2>
          <ul className="space-y-2">
            {liveAlerts.map((alert) => (
              <motion.li
                key={alert.id}
                whileHover={{ scale: 1.02 }}
                className="flex items-center bg-[#1E293B]/80 backdrop-blur-md p-4 rounded-lg shadow-lg border border-[#3B82F6]/50"
              >
                <AlertTriangle className="w-6 h-6 text-[#FF4500] mr-4" />
                <div>
                  <p className="text-[#E2E8F0]">{alert.message}</p>
                  <p className="text-sm text-[#A0AEC0]">{alert.time}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* Past Incidents */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Past Incidents</h2>
          <div className="bg-[#1E293B]/80 backdrop-blur-md rounded-lg shadow-lg border border-[#3B82F6]/50">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#3B82F6]/50">
                  <th className="px-4 py-2 text-left text-[#E2E8F0]">Timestamp</th>
                  <th className="px-4 py-2 text-left text-[#E2E8F0]">Location</th>
                  <th className="px-4 py-2 text-left text-[#E2E8F0]">Type</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id} className="border-b border-[#3B82F6]/50">
                    <td className="px-4 py-2 text-[#E2E8F0]">{incident.timestamp}</td>
                    <td className="px-4 py-2 text-[#E2E8F0]">{incident.location}</td>
                    <td className="px-4 py-2 text-[#E2E8F0]">{incident.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Threat Heatmap */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#3B82F6] mb-4">Threat Heatmap</h2>
          <div className="bg-[#1E293B]/80 backdrop-blur-md p-6 rounded-lg shadow-lg border border-[#3B82F6]/50">
            <div className="h-64 bg-gradient-to-r from-[#3B82F6] to-[#1E293B] rounded-lg flex items-center justify-center">
              <p className="text-[#E2E8F0]">Heatmap Visualization</p>
            </div>
          </div>
        </section>

        {/* System Health */}
        <section>
          <h2 className="text-xl font-bold text-[#3B82F6] mb-4">System Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1E293B]/80 backdrop-blur-md p-6 rounded-lg shadow-lg border border-[#3B82F6]/50">
              <Thermometer className="w-10 h-10 text-[#3B82F6] mb-4" />
              <p className="text-[#E2E8F0]">CPU Usage: 45%</p>
              <p className="text-[#E2E8F0]">Memory Usage: 60%</p>
            </div>
            <div className="bg-[#1E293B]/80 backdrop-blur-md p-6 rounded-lg shadow-lg border border-[#3B82F6]/50">
              <Shield className="w-10 h-10 text-[#3B82F6] mb-4" />
              <p className="text-[#E2E8F0]">Security Status: Active</p>
              <p className="text-[#E2E8F0]">Last Scan: 5 mins ago</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}