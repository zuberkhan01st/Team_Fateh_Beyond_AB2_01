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

      {/* Features Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#3B82F6] mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50"
            >
              <Zap className="w-16 h-16 text-[#3B82F6] mx-auto" />
              <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2 text-center">
                Real-Time Detection
              </h3>
              <p className="text-[#E2E8F0] text-center">
                Detect threats in real-time with minimal latency.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50"
            >
              <Eye className="w-16 h-16 text-[#3B82F6] mx-auto" />
              <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2 text-center">
                High Accuracy
              </h3>
              <p className="text-[#E2E8F0] text-center">
                Advanced AI models ensure high accuracy in threat identification.
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
                Cloud Integration
              </h3>
              <p className="text-[#E2E8F0] text-center">
                Seamless integration with cloud services for data storage and analysis.
              </p>
            </motion.div>
          </div>
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
              <Globe className="w-16 h-16 text-[#3B82F6] mx-auto" />
              <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2 text-center">
                AWS
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
              href="https://github.com/Fateh-Beyond"
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
              href="https://github.com/Fateh-Beyond/Airborne-Threat-Detection"
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