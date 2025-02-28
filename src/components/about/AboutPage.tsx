import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Building,
  Clock,
} from "lucide-react";
import Navbar from "../layout/Navbar";

const AboutPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar isDarkMode={darkMode} onDarkModeChange={setDarkMode} />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-16 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              About Our School Management System
            </h1>
            <p className="text-xl text-gray-300">
              Empowering educational institutions with modern technology
              solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-white">
                Our Mission
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our mission is to transform educational management through
                innovative technology solutions that streamline administrative
                tasks, enhance communication, and provide valuable insights for
                data-driven decision making.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We believe that by reducing administrative burden, we enable
                educators to focus on what matters most: providing quality
                education to students. Our platform is designed with input from
                educators, administrators, and technology experts to create a
                solution that truly meets the needs of modern educational
                institutions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-30"></div>
              <Card className="h-full relative bg-black/80 backdrop-blur-sm border-2 border-purple-500/30 p-6">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Key Statistics
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">1000+</div>
                    <div className="text-gray-400">
                      Schools Using Our Platform
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">50,000+</div>
                    <div className="text-gray-400">Teachers Empowered</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">
                      500,000+
                    </div>
                    <div className="text-gray-400">Students Managed</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-white">99.9%</div>
                    <div className="text-gray-400">Uptime Reliability</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-10 text-center text-white">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Award className="w-10 h-10 text-purple-400" />,
                  title: "Excellence",
                  description:
                    "We are committed to delivering excellence in every aspect of our platform, from user experience to technical performance.",
                },
                {
                  icon: <Users className="w-10 h-10 text-cyan-400" />,
                  title: "Collaboration",
                  description:
                    "We believe in the power of collaboration between educators, administrators, students, and parents to create a thriving educational environment.",
                },
                {
                  icon: <Clock className="w-10 h-10 text-emerald-400" />,
                  title: "Innovation",
                  description:
                    "We continuously innovate to incorporate the latest technologies and methodologies that enhance educational management.",
                },
              ].map((value, index) => (
                <Card
                  key={index}
                  className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 p-6"
                >
                  <div className="p-3 rounded-full bg-white/5 w-fit mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {value.title}
                  </h3>
                  <p className="text-gray-400">{value.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-10 text-center text-white">
              Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Sarah Johnson",
                  role: "CEO & Founder",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
                },
                {
                  name: "Michael Chen",
                  role: "CTO",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
                },
                {
                  name: "Emily Rodriguez",
                  role: "Head of Product",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
                },
                {
                  name: "David Kim",
                  role: "Lead Developer",
                  image:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
                },
              ].map((member, index) => (
                <Card
                  key={index}
                  className="bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 p-6 text-center"
                >
                  <div className="mb-4 mx-auto w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/50">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="text-gray-400">{member.role}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center text-white">
              Our History
            </h2>
            <div className="relative border-l-2 border-purple-500/50 pl-8 ml-4 space-y-12">
              {[
                {
                  year: "2018",
                  title: "Foundation",
                  description:
                    "Our company was founded with a vision to revolutionize school management systems.",
                },
                {
                  year: "2019",
                  title: "First Product Launch",
                  description:
                    "We launched our first version of the School Management System with core attendance and grade tracking features.",
                },
                {
                  year: "2020",
                  title: "Expansion",
                  description:
                    "Expanded our platform to include comprehensive modules for all aspects of school management.",
                },
                {
                  year: "2022",
                  title: "Global Reach",
                  description:
                    "Reached the milestone of serving 1000+ schools across 20 countries worldwide.",
                },
                {
                  year: "2024",
                  title: "Next Generation Platform",
                  description:
                    "Launched our next-generation platform with AI-powered insights and advanced analytics.",
                },
              ].map((event, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-12 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"></div>
                  <div className="mb-1 text-xl font-bold text-white">
                    {event.year}
                  </div>
                  <div className="mb-2 text-lg font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {event.title}
                  </div>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
