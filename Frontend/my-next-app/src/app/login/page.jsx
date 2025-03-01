// pages/login.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add authentication logic here (e.g., API call to backend)
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-[#E2E8F0]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md p-8 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50"
      >
        <h2 className="text-3xl font-bold text-center text-[#3B82F6] mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-[#0F172A] border border-[#3B82F6]/50 rounded-lg focus:outline-none focus:border-[#3B82F6]"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-[#0F172A] border border-[#3B82F6]/50 rounded-lg focus:outline-none focus:border-[#3B82F6]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#3B82F6] text-[#FFFFFF] font-semibold rounded-lg hover:bg-[#2563EB] transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-[#E2E8F0]">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#3B82F6] hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}