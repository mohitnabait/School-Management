import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title?: string;
  value?: string | number;
  icon?: React.ReactNode;
  trend?: number;
  color?: "cyan" | "pink" | "purple";
}

const MetricCard = ({
  title = "Total Students",
  value = "1,234",
  icon = null,
  trend = 5.2,
  color = "cyan",
}: MetricCardProps) => {
  const colorVariants = {
    cyan: "from-cyan-500/20 to-cyan-500/10 border-cyan-500/50 hover:border-cyan-400",
    pink: "from-pink-500/20 to-pink-500/10 border-pink-500/50 hover:border-pink-400",
    purple:
      "from-purple-500/20 to-purple-500/10 border-purple-500/50 hover:border-purple-400",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card
        className={cn(
          "h-full w-full bg-gradient-to-br border-2",
          "backdrop-blur-sm shadow-lg",
          "transition-all duration-300 ease-in-out",
          colorVariants[color],
        )}
      >
        <div className="p-6 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-white/90">{title}</h3>
            {icon && (
              <div
                className={cn(
                  "p-2 rounded-full",
                  color === "cyan" && "bg-cyan-500/20",
                  color === "pink" && "bg-pink-500/20",
                  color === "purple" && "bg-purple-500/20",
                )}
              >
                {icon}
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="text-3xl font-bold text-white">{value}</div>
            <div
              className={cn(
                "mt-2 text-sm",
                trend > 0 ? "text-green-400" : "text-red-400",
              )}
            >
              {trend > 0 ? "+" : ""}
              {trend}% from last month
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default MetricCard;
