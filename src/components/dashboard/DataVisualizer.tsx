import React from "react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataVisualizerProps {
  data?: Array<{
    name: string;
    attendance: number;
    grades: number;
    activities: number;
  }>;
  activeTab?: string;
}

const defaultData = [
  { name: "Jan", attendance: 85, grades: 78, activities: 65 },
  { name: "Feb", attendance: 88, grades: 82, activities: 72 },
  { name: "Mar", attendance: 82, grades: 85, activities: 78 },
  { name: "Apr", attendance: 90, grades: 88, activities: 85 },
  { name: "May", attendance: 87, grades: 90, activities: 82 },
  { name: "Jun", attendance: 92, grades: 86, activities: 88 },
];

const DataVisualizer = ({
  data = defaultData,
  activeTab = "attendance",
}: DataVisualizerProps) => {
  return (
    <Card className="w-full h-full bg-black/40 backdrop-blur-sm border-2 border-purple-500/30 p-6">
      <Tabs defaultValue={activeTab} className="w-full h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Performance Analytics
          </h2>
          <TabsList className="bg-purple-950/50">
            <TabsTrigger
              value="attendance"
              className="data-[state=active]:bg-purple-500/20"
            >
              Attendance
            </TabsTrigger>
            <TabsTrigger
              value="grades"
              className="data-[state=active]:bg-cyan-500/20"
            >
              Grades
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="data-[state=active]:bg-pink-500/20"
            >
              Activities
            </TabsTrigger>
          </TabsList>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-[300px]"
        >
          <TabsContent value="attendance" className="h-full mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    background: "#111",
                    border: "1px solid #333",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#9333ea"
                  strokeWidth={2}
                  dot={{ fill: "#9333ea" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="grades" className="h-full mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    background: "#111",
                    border: "1px solid #333",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="grades"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: "#06b6d4" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="activities" className="h-full mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    background: "#111",
                    border: "1px solid #333",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="activities"
                  stroke="#ec4899"
                  strokeWidth={2}
                  dot={{ fill: "#ec4899" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </motion.div>
      </Tabs>
    </Card>
  );
};

export default DataVisualizer;
