import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Grid } from "@/components/ui/grid";
import { getExamResults } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { BookOpen, Calendar, Trophy, User, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ExamResults = () => {
  const results = getExamResults();

  const getGradeColor = (marks: number) => {
    if (marks >= 90) return "text-green-400";
    if (marks >= 80) return "text-blue-400";
    return "text-yellow-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
          Exam Results
        </h2>
      </div>

      <Grid>
        {results.map((result, idx) => (
          <Dialog key={result.id}>
            <DialogTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="cursor-pointer"
              >
                <Card
                  className={cn(
                    "group relative overflow-hidden",
                    "bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10",
                    "border-2 border-emerald-500/20",
                    "hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/20",
                    "transition-all duration-300 ease-out",
                    "backdrop-blur-sm",
                    "hover:scale-[1.02]",
                    "animate-border",
                  )}
                >
                  <div className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300">
                        <Trophy className="w-6 h-6" />
                      </div>
                      <div
                        className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium",
                          "bg-gradient-to-r from-emerald-500/20 to-green-500/20",
                          getGradeColor(result.marks),
                        )}
                      >
                        {result.marks}/100
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {result.student_name}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300 group-hover:text-emerald-200">
                        <BookOpen className="w-4 h-4 mr-2 text-emerald-400" />
                        <span className="text-sm">{result.subject}</span>
                      </div>
                      <div className="flex items-center text-gray-300 group-hover:text-emerald-200">
                        <Trophy className="w-4 h-4 mr-2 text-green-400" />
                        <span className="text-sm">
                          {result.marks >= 90
                            ? "Excellent"
                            : result.marks >= 80
                              ? "Good"
                              : "Average"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-300 group-hover:text-emerald-200">
                        <Calendar className="w-4 h-4 mr-2 text-teal-400" />
                        <span className="text-sm">
                          Exam Date: {result.exam_date}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="bg-black/90 border-emerald-500/20">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-white">
                  Exam Result Details
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-gray-400">Student Name</p>
                    <p className="text-white font-medium">
                      {result.student_name}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">Subject</p>
                    <p className="text-white font-medium">{result.subject}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">Marks</p>
                    <p className="text-white font-medium">{result.marks}/100</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">Grade</p>
                    <p className="text-white font-medium">
                      {result.marks >= 90
                        ? "A"
                        : result.marks >= 80
                          ? "B"
                          : "C"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">Exam Date</p>
                    <p className="text-white font-medium">{result.exam_date}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">Status</p>
                    <p
                      className={cn("font-medium", getGradeColor(result.marks))}
                    >
                      {result.marks >= 90
                        ? "Excellent"
                        : result.marks >= 80
                          ? "Good"
                          : "Average"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400"
                    onClick={() => {}}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => {}}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </Grid>
    </motion.div>
  );
};

export default ExamResults;
