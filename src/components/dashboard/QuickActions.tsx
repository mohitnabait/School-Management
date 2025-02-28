import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  CalendarPlus,
  FileText,
  DollarSign,
  BookOpen,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNeonTheme } from "../theme/NeonThemeProvider";

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  description: string;
  href: string;
  color: "purple" | "cyan" | "emerald" | "pink";
}

interface QuickActionsProps {
  actions?: QuickAction[];
}

const defaultActions: QuickAction[] = [
  {
    icon: <UserPlus className="w-5 h-5" />,
    label: "Add Student",
    description: "Register a new student",
    href: "/students",
    color: "purple",
  },
  {
    icon: <CalendarPlus className="w-5 h-5" />,
    label: "Mark Attendance",
    description: "Record today's attendance",
    href: "/attendance",
    color: "cyan",
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: "Add Exam Result",
    description: "Enter new exam scores",
    href: "/exams",
    color: "emerald",
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    label: "Fee Collection",
    description: "Record fee payments",
    href: "/fees",
    color: "pink",
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    label: "Add Class",
    description: "Create a new class",
    href: "/classes",
    color: "purple",
  },
  {
    icon: <Bell className="w-5 h-5" />,
    label: "Announcements",
    description: "Post new announcements",
    href: "/dashboard",
    color: "cyan",
  },
];

const QuickActions = ({ actions = defaultActions }: QuickActionsProps) => {
  const navigate = useNavigate();
  const { primaryColor } = useNeonTheme();

  const colorVariants = {
    purple:
      "from-purple-500/10 to-purple-500/5 border-purple-500/30 hover:border-purple-500/50 text-purple-400",
    cyan: "from-cyan-500/10 to-cyan-500/5 border-cyan-500/30 hover:border-cyan-500/50 text-cyan-400",
    emerald:
      "from-emerald-500/10 to-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400",
    pink: "from-pink-500/10 to-pink-500/5 border-pink-500/30 hover:border-pink-500/50 text-pink-400",
  };

  return (
    <Card className="w-full bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              className={cn(
                "w-full h-auto flex flex-col items-center justify-center p-4 gap-2 bg-gradient-to-b border-2",
                colorVariants[action.color],
              )}
              onClick={() => navigate(action.href)}
            >
              <div className="p-2 rounded-full bg-white/5">{action.icon}</div>
              <div className="text-center">
                <div className="font-medium">{action.label}</div>
                <div className="text-xs opacity-70">{action.description}</div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
