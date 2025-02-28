import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "./Sidebar";
import { Toast } from "../common/Toast";
import LoadingAnimation from "../common/LoadingAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { ROLES, UserRole } from "@/lib/roles";

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: UserRole;
}

const MainLayout = ({ children, userRole = ROLES.ADMIN }: MainLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div className="min-h-screen w-full bg-black flex">
      <Toast />
      <Sidebar
        activeItem={location.pathname}
        onNavigate={(path) => navigate(path)}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <main className="flex-1 p-6 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MainLayout;
