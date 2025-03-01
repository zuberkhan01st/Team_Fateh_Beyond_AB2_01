"use client"; // Ensure this is a client component

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
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
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-6 text-xl text-[#E2E8F0] text-center px-4"
        >
          Get in touch with us for inquiries, support, or collaborations.
        </motion.p>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#3B82F6] mb-12">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
  { name: "Zuber Khan", role: "Team Lead" },
  { name: "Ayush Katre", role: "Developer" },
  { name: "Rahul", role: "Developer" },
  { name: "Aman Shaikh", role: "Developer" },
].map((member, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: index * 0.2 }}
    className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50 text-center"
  >
    <div className="w-24 h-24 bg-[#3B82F6] rounded-full mx-auto flex items-center justify-center text-2xl font-bold text-[#0F172A]">
      {member.name.split(" ")[0][0]} {/* First initial */}
      {member.name.split(" ")[1] ? member.name.split(" ")[1][0] : ""} {/* Last initial if it exists */}
    </div>
    <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2">
      {member.name}
    </h3>
    <p className="text-[#E2E8F0]">{member.role}</p>
  </motion.div>
))}
          </div>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#3B82F6] mb-12">
            Contact Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50 text-center"
            >
              <Mail className="w-16 h-16 text-[#3B82F6] mx-auto" />
              <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2">
                Email
              </h3>
              <p className="text-[#E2E8F0]">
                <a
                  href="mailto:zuberkhan01st@gmail.com"
                  className="hover:underline"
                >
                  zuberkhan01st@gmail.com
                </a>
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50 text-center"
            >
              <Phone className="w-16 h-16 text-[#3B82F6] mx-auto" />
              <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2">
                Phone
              </h3>
              <p className="text-[#E2E8F0]">+1 (123) 456-7890</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="p-6 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50 text-center"
            >
              <MapPin className="w-16 h-16 text-[#3B82F6] mx-auto" />
              <h3 className="text-xl font-semibold text-[#E2E8F0] mt-4 mb-2">
                Address
              </h3>
              <p className="text-[#E2E8F0]">
                123 Security Lane, Tech City, World
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-[#0F172A]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-[#3B82F6] mb-12">
            Follow Us
          </h2>
          <div className="flex justify-center space-x-8">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50 hover:bg-[#3B82F6] transition duration-300"
            >
              <Github className="w-8 h-8 text-[#E2E8F0]" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50 hover:bg-[#3B82F6] transition duration-300"
            >
              <Linkedin className="w-8 h-8 text-[#E2E8F0]" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-4 bg-[#1E293B] rounded-lg shadow-lg border border-[#3B82F6]/50 hover:bg-[#3B82F6] transition duration-300"
            >
              <Twitter className="w-8 h-8 text-[#E2E8F0]" />
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}