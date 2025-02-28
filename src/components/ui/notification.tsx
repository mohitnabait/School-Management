import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NotificationProps {
  title: string;
  description?: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
  onClose?: () => void;
  action?: React.ReactNode;
  open?: boolean;
}

const Notification = ({
  title,
  description,
  type = "info",
  duration = 5000,
  onClose,
  action,
  open = true,
}: NotificationProps) => {
  const [isVisible, setIsVisible] = React.useState(open);

  React.useEffect(() => {
    setIsVisible(open);
  }, [open]);

  React.useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const typeStyles = {
    info: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    success: "bg-green-500/10 border-green-500/30 text-green-400",
    warning: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    error: "bg-red-500/10 border-red-500/30 text-red-400",
  };

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "fixed top-4 right-4 z-50 w-full max-w-sm overflow-hidden rounded-lg border p-4 shadow-lg backdrop-blur-sm",
            typeStyles[type],
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium">{title}</h3>
              {description && (
                <div className="mt-1 text-sm opacity-90">{description}</div>
              )}
              {action && <div className="mt-3">{action}</div>}
            </div>
            <button
              onClick={handleClose}
              className="ml-4 rounded-full p-1 hover:bg-white/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Notification };
