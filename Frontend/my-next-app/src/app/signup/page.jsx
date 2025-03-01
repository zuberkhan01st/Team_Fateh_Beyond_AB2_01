// pages/signup.js
"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "security", // Default role
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters long.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate successful signup
    console.log("Signing up with:", formData);
    setSuccessMessage("Account created successfully! Redirecting to login...");
    setTimeout(() => {
      window.location.href = "/login"; // Redirect to login page
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-[#E2E8F0]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full max-w-md p-8 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50"
      >
        <h2 className="text-3xl font-bold text-center text-[#3B82F6] mb-6 flex items-center justify-center">
          <UserPlus className="w-8 h-8 mr-2" /> Sign Up
        </h2>

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-400 text-center mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleSignup}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full px-4 py-2 bg-[#0F172A] border ${
                errors.name ? "border-red-500" : "border-[#3B82F6]/50"
              } rounded-lg focus:outline-none focus:border-[#3B82F6]`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full px-4 py-2 bg-[#0F172A] border ${
                errors.email ? "border-red-500" : "border-[#3B82F6]/50"
              } rounded-lg focus:outline-none focus:border-[#3B82F6]`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={`w-full px-4 py-2 bg-[#0F172A] border ${
                errors.password ? "border-red-500" : "border-[#3B82F6]/50"
              } rounded-lg focus:outline-none focus:border-[#3B82F6]`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className={`w-full px-4 py-2 bg-[#0F172A] border ${
                errors.confirmPassword ? "border-red-500" : "border-[#3B82F6]/50"
              } rounded-lg focus:outline-none focus:border-[#3B82F6]`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0F172A] border border-[#3B82F6]/50 rounded-lg focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="security">Security Officer</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#3B82F6] text-[#FFFFFF] font-semibold rounded-lg hover:bg-[#2563EB] transition duration-300"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-[#E2E8F0]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#3B82F6] hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}