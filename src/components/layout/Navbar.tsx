import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isDarkMode?: boolean;
  onDarkModeChange?: (isDark: boolean) => void;
}

const Navbar = ({ isDarkMode = true, onDarkModeChange }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(isDarkMode);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Features", path: "/features" },
    { label: "About", path: "/about" },
    { label: "Pricing", path: "/pricing" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (onDarkModeChange) {
      onDarkModeChange(newMode);
    }
    // Apply dark mode to document
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-black/80 backdrop-blur-md py-3 shadow-lg shadow-purple-500/10"
          : "bg-transparent py-6",
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer"
          >
            School Management
          </h1>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={cn(
                  "text-gray-300 hover:text-white transition-colors",
                  location.pathname === item.path && "text-white font-medium",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
              <span className="relative z-10">
                {darkMode ? (
                  <Sun className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
                ) : (
                  <Moon className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
                )}
              </span>
            </Button>

            <motion.button
              type="button"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/auth")}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute -inset-px bg-gradient-to-r from-purple-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 animate-pulse"></span>
              <span className="relative z-10">Login</span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full text-gray-300 hover:text-white hover:bg-white/10 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>
            <span className="relative z-10">
              {darkMode ? (
                <Sun className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
              ) : (
                <Moon className="h-5 w-5 group-hover:rotate-90 transition-transform duration-500" />
              )}
            </span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10"
        >
          <div className="container mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "text-gray-300 hover:text-white transition-colors py-2",
                    location.pathname === item.path && "text-white font-medium",
                  )}
                >
                  {item.label}
                </button>
              ))}
              <Button
                type="button"
                onClick={() => {
                  navigate("/auth");
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium"
              >
                Login
              </Button>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
