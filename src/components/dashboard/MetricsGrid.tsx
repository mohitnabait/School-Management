import React from "react";
import { Grid } from "@/components/ui/grid";
import MetricCard from "./MetricCard";
import { Users, GraduationCap, Calendar, TrendingUp } from "lucide-react";

interface MetricsGridProps {
  metrics?: Array<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend: number;
    color: "cyan" | "pink" | "purple";
  }>;
}

const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  const defaultMetrics = [
    {
      title: "Total Students",
      value: "1,234",
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      trend: 5.2,
      color: "cyan" as const,
    },
    {
      title: "Active Courses",
      value: "42",
      icon: <GraduationCap className="w-6 h-6 text-pink-400" />,
      trend: 2.4,
      color: "pink" as const,
    },
    {
      title: "Upcoming Events",
      value: "8",
      icon: <Calendar className="w-6 h-6 text-purple-400" />,
      trend: -1.5,
      color: "purple" as const,
    },
    {
      title: "Average Performance",
      value: "87%",
      icon: <TrendingUp className="w-6 h-6 text-cyan-400" />,
      trend: 3.8,
      color: "cyan" as const,
    },
  ];

  const displayMetrics = metrics || defaultMetrics;

  return (
    <div className="w-full p-6 bg-gray-900/50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default MetricsGrid;
