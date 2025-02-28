import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  DollarSign,
  BarChart,
  CheckCircle,
  Bell,
  FileText,
  Settings,
  Shield,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";

const FeaturesPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  const features = [
    {
      icon: <Users className="w-12 h-12 text-purple-400" />,
      title: "Student Management",
      description:
        "Comprehensive student information system with detailed profiles, academic history, and performance tracking.",
      details: [
        "Complete student profiles with contact information",
        "Academic history and transcript management",
        "Behavior and discipline tracking",
        "Health records and emergency contacts",
        "Custom fields for institution-specific data",
      ],
    },
    {
      icon: <GraduationCap className="w-12 h-12 text-cyan-400" />,
      title: "Teacher Portal",
      description:
        "Empower teachers with tools to manage classes, assignments, grades, and communication with students and parents.",
      details: [
        "Class roster management and attendance tracking",
        "Assignment creation and grading",
        "Gradebook with customizable grading scales",
        "Direct messaging with students and parents",
        "Lesson planning and resource sharing",
      ],
    },
    {
      icon: <BarChart className="w-12 h-12 text-emerald-400" />,
      title: "Admin Dashboard",
      description:
        "Comprehensive control over school operations with real-time data visualization and actionable insights.",
      details: [
        "School-wide performance metrics and KPIs",
        "Financial tracking and reporting",
        "Staff management and scheduling",
        "System configuration and user management",
        "Custom reports and data exports",
      ],
    },
    {
      icon: <Calendar className="w-12 h-12 text-pink-400" />,
      title: "Scheduling System",
      description:
        "Effortlessly manage class schedules, events, and academic calendars with conflict detection and resolution.",
      details: [
        "Master schedule creation and management",
        "Automatic conflict detection",
        "Room and resource allocation",
        "Event scheduling and calendar integration",
        "Schedule publishing and notifications",
      ],
    },
    {
      icon: <BookOpen className="w-12 h-12 text-amber-400" />,
      title: "Curriculum Management",
      description:
        "Organize and track curriculum implementation, learning objectives, and educational resources.",
      details: [
        "Curriculum mapping to standards",
        "Unit and lesson planning",
        "Resource library and sharing",
        "Learning objective tracking",
        "Curriculum review and improvement tools",
      ],
    },
    {
      icon: <DollarSign className="w-12 h-12 text-blue-400" />,
      title: "Fee Management",
      description:
        "Streamline fee collection, generate invoices, and track payment status with automated reminders.",
      details: [
        "Fee structure configuration",
        "Invoice generation and distribution",
        "Online payment processing",
        "Payment tracking and receipts",
        "Automated payment reminders",
      ],
    },
    {
      icon: <Bell className="w-12 h-12 text-red-400" />,
      title: "Notification System",
      description:
        "Keep everyone informed with targeted notifications for students, parents, teachers, and administrators.",
      details: [
        "Multi-channel notifications (email, SMS, in-app)",
        "Customizable notification templates",
        "Scheduled and triggered notifications",
        "Notification preferences and management",
        "Delivery tracking and confirmation",
      ],
    },
    {
      icon: <FileText className="w-12 h-12 text-indigo-400" />,
      title: "Report Generation",
      description:
        "Create comprehensive reports for academic performance, attendance, finances, and more with customizable templates.",
      details: [
        "Report card generation",
        "Attendance reports and analytics",
        "Financial summaries and statements",
        "Custom report builder",
        "Scheduled report distribution",
      ],
    },
    {
      icon: <Shield className="w-12 h-12 text-green-400" />,
      title: "Security & Compliance",
      description:
        "Ensure data security and compliance with educational regulations through robust security measures.",
      details: [
        "Role-based access control",
        "Data encryption and protection",
        "Audit logging and activity tracking",
        "Compliance with FERPA, GDPR, and other regulations",
        "Regular security updates and patches",
      ],
    },
    {
      icon: <Smartphone className="w-12 h-12 text-yellow-400" />,
      title: "Mobile Access",
      description:
        "Access the platform on-the-go with native mobile apps for iOS and Android devices.",
      details: [
        "Native iOS and Android applications",
        "Responsive web design for all devices",
        "Offline access to essential features",
        "Push notifications",
        "Biometric authentication",
      ],
    },
    {
      icon: <Settings className="w-12 h-12 text-purple-400" />,
      title: "Customization",
      description:
        "Tailor the platform to your institution's specific needs with extensive customization options.",
      details: [
        "Custom fields and data structures",
        "Workflow customization",
        "Branding and white-labeling",
        "Custom reports and dashboards",
        "API access for integrations",
      ],
    },
  ];

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
              Powerful Features for Modern Education
            </h1>
            <p className="text-xl text-gray-300">
              Our comprehensive platform offers everything you need to
              streamline school management
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  <div className="p-6 flex flex-col h-full relative z-10">
                    <div className="p-3 rounded-full bg-white/5 w-fit mb-4 transform group-hover:scale-110 transition-transform duration-300 group-hover:animate-pulse-glow">
                      {feature.icon}
                    </div>

                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {feature.title}
                    </h3>

                    <p className="text-gray-400 mb-6">{feature.description}</p>

                    <div className="mt-auto">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">
                        Key Capabilities:
                      </h4>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-gray-400"
                          >
                            <CheckCircle className="w-4 h-4 mr-2 mt-1 text-green-400 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Ready to experience these features?
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
              Get Started Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;
