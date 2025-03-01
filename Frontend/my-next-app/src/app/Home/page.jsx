"use client"; // Ensure this is a client component

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Camera,
  Shield,
  AlertTriangle,
  Server,
  BarChart2,
  Zap,
  Eye,
  Code,
  Cloud,
  Users,
  Settings,
  Globe,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-[#E2E8F0]">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#3B82F6] via-[#0F172A] to-[#0F172A]">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold text-[#E2E8F0] text-center"
        >
          Airborne Threat Detection System
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 text-xl text-[#E2E8F0] text-center px-4"
        >
          Advanced AI-powered system for detecting drones, missiles, and other airborne threats in real-time.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12"
        >
          <Link href="/contact">
            <button className="px-8 py-4 bg-[#3B82F6] text-[#FFFFFF] font-semibold rounded-lg hover:bg-[#2563EB] transition duration-300 shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Arch Flow Section */}
      <section className="py-20 bg-[#0F172A] relative overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#3B82F6] mb-12">
            How It Works
          </h2>

          {/* Zig-Zag Connecting Line */}
          <div className="absolute top-0 left-1/2 h-full w-2 transform -translate-x-1/2">
            <svg
              viewBox="0 0 20 100"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M 10,0 Q 20,25 10,50 T 10,100"
                stroke="#3B82F6"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>
          </div>

          {/* Step 1: Surveillance Camera Input */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center justify-end md:justify-start"
          >
            <div className="w-1/2">
              <div className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50">
                <Camera className="w-16 h-16 text-[#3B82F6]" />
                <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2">
                  Surveillance Camera Input
                </h3>
                <p className="text-[#E2E8F0]">
                  Capture video footage from surveillance cameras or drones.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 2: AI Model Analysis */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-start md:justify-end mt-12"
          >
            <div className="w-1/2 ml-auto">
              <div className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50">
                <Shield className="w-16 h-16 text-[#3B82F6]" />
                <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2">
                  AI Model Analysis
                </h3>
                <p className="text-[#E2E8F0]">
                  Process footage using advanced deep learning models like YOLO.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 3: Decision Making */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center justify-end md:justify-start mt-12"
          >
            <div className="w-1/2">
              <div className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50">
                <AlertTriangle className="w-16 h-16 text-[#3B82F6]" />
                <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2">
                  Decision Making
                </h3>
                <p className="text-[#E2E8F0]">
                  Determine if the object is a threat (e.g., drone/missile) or non-threatening (e.g., bird).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 4: Alert System */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex items-center justify-start md:justify-end mt-12"
          >
            <div className="w-1/2 ml-auto">
              <div className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50">
                <Server className="w-16 h-16 text-[#3B82F6]" />
                <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2">
                  Alert System
                </h3>
                <p className="text-[#E2E8F0]">
                  Notify authorities immediately if a threat is detected.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 5: Dashboard */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="flex items-center justify-end md:justify-start mt-12"
          >
            <div className="w-1/2">
              <div className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50">
                <BarChart2 className="w-16 h-16 text-[#3B82F6]" />
                <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2">
                  Dashboard
                </h3>
                <p className="text-[#E2E8F0]">
                  Display responses, logs, and incident details for authorities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#3B82F6] mb-12">
            Tech Stack
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50"
            >
              <Code className="w-16 h-16 text-[#3B82F6] mx-auto" />
              <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2 text-center">
                Next.js
              </h3>
              <p className="text-[#E2E8F0] text-center">
                For building a fast and scalable frontend.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50"
            >
              <Settings className="w-16 h-16 text-[#3B82F6] mx-auto" />
              <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2 text-center">
                TensorFlow
              </h3>
              <p className="text-[#E2E8F0] text-center">
                For training and deploying AI models.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50"
            >
              <Cloud className="w-16 h-16 text-[#3B82F6] mx-auto" />
              <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2 text-center">
                Cloud
              </h3>
              <p className="text-[#E2E8F0] text-center">
                For cloud infrastructure and deployment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#3B82F6] mb-6">
            Ready to Enhance Your Security?
          </h2>
          <p className="text-lg text-[#E2E8F0] mb-8">
            Contact us today to learn more about our airborne threat detection system.
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-[#3B82F6] text-[#FFFFFF] font-semibold rounded-lg hover:bg-[#2563EB] transition duration-300 shadow-lg hover:shadow-xl">
              Contact Us
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-[#0F172A] text-[#E2E8F0]">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/zuberkhan01st/Team_Fateh_Beyond_AB2_01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3B82F6] hover:underline"
            >
              Team Fateh Beyond
            </a>
          </p>
          <p>
            View our project on{" "}
            <a
              href="https://github.com/zuberkhan01st/Team_Fateh_Beyond_AB2_01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3B82F6] hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}