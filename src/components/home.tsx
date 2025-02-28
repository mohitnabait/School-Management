import React, { useState } from "react";
import CurrentDateTime from "./common/CurrentDateTime";
import MetricsGrid from "./dashboard/MetricsGrid";
import DataVisualizer from "./dashboard/DataVisualizer";
import DashboardCalendar from "./dashboard/DashboardCalendar";
import QuickActions from "./dashboard/QuickActions";
import ThemeCustomizer from "./theme/ThemeCustomizer";
import { motion } from "framer-motion";
import { UserRole } from "@/lib/roles";
import { useAuth0 } from "@auth0/auth0-react";

interface HomeProps {
  userRole?: UserRole;
  initialDarkMode?: boolean;
  initialAccentColor?: "cyan" | "pink" | "purple";
}

const Home = ({
  userRole,
  initialDarkMode = true,
  initialAccentColor = "cyan",
}: HomeProps) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [accentColor, setAccentColor] = useState(initialAccentColor);
  const { user } = useAuth0();

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex justify-between items-start gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome Back, {user?.name || "Admin"}
            </h1>
            <p className="text-gray-400">
              Here's what's happening in your school today
            </p>
          </div>
          <div className="flex items-start gap-6">
            <CurrentDateTime />
            <ThemeCustomizer
              isDarkMode={darkMode}
              onDarkModeChange={setDarkMode}
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <MetricsGrid />

        {/* Quick Actions and Data Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
          <div className="lg:col-span-2 h-[400px]">
            <DataVisualizer />
          </div>
        </div>

        {/* Calendar */}
        <div className="h-[400px]">
          <DashboardCalendar />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
