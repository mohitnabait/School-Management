import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import ThemeCustomizer from "../theme/ThemeCustomizer";
import { UserProfile } from "../auth/UserProfile";

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-black/40 backdrop-blur-sm border-2 border-purple-500/30">
          <h3 className="text-xl font-semibold text-white mb-4">Profile</h3>
          <UserProfile />
        </Card>

        <Card className="p-6 bg-black/40 backdrop-blur-sm border-2 border-purple-500/30">
          <h3 className="text-xl font-semibold text-white mb-4">Theme</h3>
          <ThemeCustomizer />
        </Card>
      </div>
    </motion.div>
  );
};

export default Settings;
