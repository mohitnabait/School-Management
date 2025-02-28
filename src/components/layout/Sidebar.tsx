import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Home,
  Users,
  GraduationCap,
  Calendar,
  FileText,
  Settings,
  LogOut,
  DollarSign,
  BookOpen,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ROLES, UserRole } from "@/lib/roles";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  roles?: UserRole[];
}

interface SidebarProps {
  activeItem?: string;
  onNavigate?: (href: string) => void;
  userRole?: UserRole;
  onLogout?: () => void;
}

const Sidebar = ({
  activeItem = "/dashboard",
  onNavigate = () => {},
  userRole = ROLES.STUDENT,
  onLogout = () => {},
}: SidebarProps) => {
  const { logout } = useAuth0();

  const items: NavItem[] = [
    { icon: <Home size={24} />, label: "Dashboard", href: "/dashboard" },
    {
      icon: <Users size={24} />,
      label: "Students",
      href: "/students",
      roles: [ROLES.ADMIN, ROLES.TEACHER],
    },
    {
      icon: <Users size={24} />,
      label: "Teachers",
      href: "/teachers",
      roles: [ROLES.ADMIN],
    },
    {
      icon: <GraduationCap size={24} />,
      label: "Classes",
      href: "/classes",
      roles: [ROLES.ADMIN],
    },
    {
      icon: <Calendar size={24} />,
      label: "Attendance",
      href: "/attendance",
      roles: [ROLES.ADMIN, ROLES.TEACHER],
    },
    {
      icon: <BookOpen size={24} />,
      label: "Exams",
      href: "/exams",
    },
    {
      icon: <DollarSign size={24} />,
      label: "Fees",
      href: "/fees",
      roles: [ROLES.ADMIN],
    },
  ];

  const filteredItems = items.filter(
    (item) => !item.roles || item.roles.includes(userRole),
  );

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    onLogout();
  };

  return (
    <div className="h-screen w-[280px] bg-black/95 border-r border-white/10 flex flex-col justify-between p-4">
      <div>
        {/* Logo Area */}
        <div className="mb-8 p-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent"
          >
            School Admin
          </motion.h1>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          <TooltipProvider>
            {filteredItems.map((item, index) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate(item.href)}
                    className={cn(
                      "w-full flex items-center gap-4 px-4 py-3 rounded-lg",
                      "transition-all duration-300 ease-in-out",
                      activeItem === item.href
                        ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50"
                        : "hover:bg-white/5",
                      "group",
                    )}
                  >
                    <span
                      className={cn(
                        "text-white/60 group-hover:text-cyan-400 transition-colors",
                        activeItem === item.href && "text-cyan-400",
                      )}
                    >
                      {item.icon}
                    </span>
                    <span
                      className={cn(
                        "text-white/60 group-hover:text-white transition-colors",
                        activeItem === item.href && "text-white",
                      )}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 group"
                onClick={() => onNavigate("/settings")}
              >
                <Settings
                  size={24}
                  className="text-white/60 group-hover:text-cyan-400 transition-colors"
                />
                <span className="text-white/60 group-hover:text-white transition-colors">
                  Settings
                </span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-white/5 group"
                onClick={handleLogout}
              >
                <LogOut
                  size={24}
                  className="text-white/60 group-hover:text-red-400 transition-colors"
                />
                <span className="text-white/60 group-hover:text-white transition-colors">
                  Logout
                </span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
