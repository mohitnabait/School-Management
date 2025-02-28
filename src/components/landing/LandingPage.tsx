import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <nav className="absolute top-0 left-0 w-full z-10 p-6">
          <div className="container mx-auto flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              School Management
            </motion.h1>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/auth")}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium"
            >
              Login
            </motion.button>
          </div>
        </nav>

        <div className="min-h-screen flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-emerald-500/20" />
          <div className="container mx-auto px-6 py-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Modern School Management System
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Streamline your school's operations with our comprehensive
                management solution
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/auth")}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium text-lg"
              >
                Get Started
              </motion.button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-black/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Student Management",
                description:
                  "Track student progress, attendance, and performance",
              },
              {
                title: "Teacher Portal",
                description: "Manage classes, grades, and communication",
              },
              {
                title: "Admin Dashboard",
                description: "Comprehensive control over school operations",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10"
              >
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/80 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                About Us
              </h3>
              <p className="text-gray-400">
                Modern school management solution for the digital age.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>Home</li>
                <li>Features</li>
                <li>Pricing</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Contact
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@school.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 School St</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {/* Add social media icons */}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            © 2024 School Management System. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
