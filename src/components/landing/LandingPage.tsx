import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  BarChart,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "../layout/Navbar";

const LandingPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar isDarkMode={darkMode} onDarkModeChange={setDarkMode} />

      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754')] bg-cover bg-center opacity-10" />

        <div className="min-h-screen flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-cyan-500/20 to-emerald-500/20" />
          <div className="container mx-auto px-6 py-24 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl"
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Modern School Management System
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Streamline your school's operations with our comprehensive
                  management solution. Designed for administrators, teachers,
                  and students.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    onClick={() => navigate("/auth")}
                    className="px-8 py-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium text-lg"
                  >
                    Get Started <ArrowRight className="ml-2" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/features")}
                    className="px-8 py-6 rounded-full border-purple-500/50 text-white font-medium text-lg"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="hidden lg:block relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                <div className="relative bg-black/80 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <img
                    src="https://images.unsplash.com/photo-1620912189865-1e8a33da4c5e"
                    alt="Dashboard Preview"
                    className="w-[500px] h-auto rounded-lg shadow-2xl border border-white/10"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-16 bg-black/80 border-y border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1000+", label: "Schools" },
              { number: "50,000+", label: "Teachers" },
              { number: "500,000+", label: "Students" },
              { number: "99.9%", label: "Uptime" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Key Features
            </h2>
            <p className="text-xl text-gray-300">
              Our platform offers a comprehensive suite of tools designed to
              streamline school management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-10 h-10 text-purple-400" />,
                title: "Student Management",
                description:
                  "Track student progress, attendance, and performance with detailed analytics and reporting.",
              },
              {
                icon: <GraduationCap className="w-10 h-10 text-cyan-400" />,
                title: "Teacher Portal",
                description:
                  "Empower teachers with tools to manage classes, grades, and communication with students and parents.",
              },
              {
                icon: <BarChart className="w-10 h-10 text-emerald-400" />,
                title: "Admin Dashboard",
                description:
                  "Comprehensive control over school operations with real-time data visualization and insights.",
              },
              {
                icon: <Calendar className="w-10 h-10 text-pink-400" />,
                title: "Scheduling System",
                description:
                  "Effortlessly manage class schedules, events, and academic calendars with conflict detection.",
              },
              {
                icon: <BookOpen className="w-10 h-10 text-amber-400" />,
                title: "Curriculum Management",
                description:
                  "Organize and track curriculum implementation, learning objectives, and educational resources.",
              },
              {
                icon: <DollarSign className="w-10 h-10 text-blue-400" />,
                title: "Fee Management",
                description:
                  "Streamline fee collection, generate invoices, and track payment status with automated reminders.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-white/5 w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section
        id="modules"
        className="py-24 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30"
      >
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Comprehensive Modules
            </h2>
            <p className="text-xl text-gray-300">
              Our platform is built with specialized modules to address every
              aspect of school management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Attendance Tracking",
                description:
                  "Automated attendance tracking with multiple marking options and detailed reporting.",
                features: [
                  "Real-time tracking",
                  "Absence notifications",
                  "Attendance analytics",
                  "Mobile marking",
                ],
              },
              {
                title: "Grade Management",
                description:
                  "Comprehensive grading system with customizable assessment types and grade calculations.",
                features: [
                  "Custom grading scales",
                  "Progress reports",
                  "Grade analytics",
                  "Parent portal access",
                ],
              },
              {
                title: "Communication Hub",
                description:
                  "Centralized communication platform connecting administrators, teachers, students and parents.",
                features: [
                  "Announcements",
                  "Direct messaging",
                  "Document sharing",
                  "Event notifications",
                ],
              },
              {
                title: "Resource Management",
                description:
                  "Track and allocate school resources including classrooms, equipment, and learning materials.",
                features: [
                  "Inventory tracking",
                  "Resource booking",
                  "Maintenance scheduling",
                  "Usage analytics",
                ],
              },
              {
                title: "Exam Management",
                description:
                  "End-to-end exam management from creation to grading with detailed performance analytics.",
                features: [
                  "Exam scheduling",
                  "Question banks",
                  "Auto-grading",
                  "Performance insights",
                ],
              },
              {
                title: "Transport Management",
                description:
                  "Manage school transportation with route planning, vehicle tracking, and attendance.",
                features: [
                  "Route optimization",
                  "Driver management",
                  "Student tracking",
                  "Parent notifications",
                ],
              },
            ].map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {module.title}
                    </h3>
                    <p className="text-gray-400 mb-6">{module.description}</p>
                    <div className="mt-auto">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {module.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-gray-400"
                          >
                            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-black/70">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-300">
              Hear from administrators, teachers, and parents who use our
              platform every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "This platform has transformed how we manage our school. The administrative burden has been reduced by at least 40%.",
                name: "Sarah Johnson",
                role: "School Principal",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
              },
              {
                quote:
                  "As a teacher, I can focus more on teaching and less on paperwork. The attendance and grading systems are intuitive and save me hours each week.",
                name: "Michael Rodriguez",
                role: "High School Teacher",
                image:
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
              },
              {
                quote:
                  "Being able to track my child's progress in real-time has made a huge difference in how we support their education at home.",
                name: "Emily Chen",
                role: "Parent",
                image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-gradient-to-br from-purple-500/10 via-black to-cyan-500/10 backdrop-blur-sm border border-white/10">
                  <div className="p-6">
                    <div className="mb-6">
                      <svg
                        className="h-8 w-8 text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-gray-300 mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 border border-purple-500/30"
                      />
                      <div>
                        <p className="font-medium text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-300">
              Choose the plan that fits your school's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$299",
                period: "per month",
                description: "Perfect for small schools just getting started",
                features: [
                  "Up to 500 students",
                  "Basic attendance tracking",
                  "Grade management",
                  "Parent portal",
                  "Email support",
                ],
                cta: "Get Started",
                highlighted: false,
              },
              {
                name: "Professional",
                price: "$599",
                period: "per month",
                description: "Ideal for growing schools with advanced needs",
                features: [
                  "Up to 2,000 students",
                  "Advanced attendance system",
                  "Comprehensive grade management",
                  "Communication hub",
                  "Resource management",
                  "Exam management",
                  "Priority support",
                ],
                cta: "Get Started",
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                description:
                  "Tailored solutions for large educational institutions",
                features: [
                  "Unlimited students",
                  "All Professional features",
                  "Custom integrations",
                  "Advanced analytics",
                  "Dedicated account manager",
                  "24/7 premium support",
                  "On-site training",
                ],
                cta: "Contact Us",
                highlighted: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="h-full"
              >
                <Card
                  className={`h-full relative overflow-hidden ${
                    plan.highlighted
                      ? "bg-gradient-to-br from-purple-900/40 to-cyan-900/40 border-2 border-purple-500/50"
                      : "bg-black/40 border border-white/10"
                  } backdrop-blur-sm`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 transform translate-x-8 translate-y-4 rotate-45">
                      POPULAR
                    </div>
                  )}
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-white">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-400 ml-2">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 mb-6">{plan.description}</p>

                    <div className="mb-8">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">
                        What's included:
                      </h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-gray-400"
                          >
                            <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <Button
                        type="button"
                        onClick={() => navigate("/auth")}
                        className={`w-full ${
                          plan.highlighted
                            ? "bg-gradient-to-r from-purple-500 to-cyan-500"
                            : "bg-white/10 hover:bg-white/20"
                        } text-white py-6`}
                      >
                        {plan.cta}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/30 to-cyan-900/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to transform your school management?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of schools already using our platform to streamline
            operations and improve educational outcomes.
          </p>
          <Button
            type="button"
            onClick={() => navigate("/auth")}
            className="px-8 py-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium text-lg"
          >
            Start Your Free Trial <ArrowRight className="ml-2" />
          </Button>
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
                Modern school management solution for the digital age,
                empowering educational institutions worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate("/features")}
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate("/about")}
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate("/pricing")}
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate("/contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Contact
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@schoolmanagement.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: 123 Education Ave, Suite 500</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </button>
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
