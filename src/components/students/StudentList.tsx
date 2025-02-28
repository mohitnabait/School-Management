import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "@/lib/db/queries";
import {
  User,
  Mail,
  GraduationCap,
  CalendarDays,
  Plus,
  LayoutGrid,
  List,
} from "lucide-react";
import DataForm from "../common/DataForm";
import { useCustomToast } from "../common/Toast";
import type { Student } from "@/lib/db/schema";
import { Grid } from "@/components/ui/grid";
import { cn } from "@/lib/utils";
import StudentTable from "./StudentTable";

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const { showSuccess, showError } = useCustomToast();

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    const data = getStudents();
    setStudents(data);
  };

  const handleCreate = async (data: Omit<Student, "id">) => {
    try {
      await createStudent(data);
      loadStudents();
      setShowForm(false);
      showSuccess("Student created successfully");
    } catch (error) {
      showError("Failed to create student");
    }
  };

  const handleUpdate = async (data: Partial<Student>) => {
    if (!editingStudent?.id) return;
    try {
      await updateStudent(editingStudent.id, data);
      loadStudents();
      setEditingStudent(null);
      showSuccess("Student updated successfully");
    } catch (error) {
      showError("Failed to update student");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      loadStudents();
      showSuccess("Student deleted successfully");
    } catch (error) {
      showError("Failed to delete student");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Student
          </Button>

          <div className="border border-white/10 rounded-md p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-purple-500" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className={viewMode === "table" ? "bg-purple-500" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="mb-6">
          <DataForm
            title="Student"
            fields={[
              { name: "name", label: "Name", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              {
                name: "grade",
                label: "Grade",
                type: "select",
                required: true,
                options: ["9th", "10th", "11th", "12th"],
              },
              {
                name: "section",
                label: "Section",
                type: "select",
                required: true,
                options: ["A", "B", "C"],
              },
              {
                name: "admission_date",
                label: "Admission Date",
                type: "date",
                required: true,
              },
            ]}
            onSubmit={handleCreate}
          />
        </div>
      )}

      {editingStudent && (
        <div className="mb-6">
          <DataForm
            title="Student"
            fields={[
              { name: "name", label: "Name", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              {
                name: "grade",
                label: "Grade",
                type: "select",
                required: true,
                options: ["9th", "10th", "11th", "12th"],
              },
              {
                name: "section",
                label: "Section",
                type: "select",
                required: true,
                options: ["A", "B", "C"],
              },
            ]}
            onSubmit={handleUpdate}
            initialData={editingStudent}
            isEdit
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Students Directory
        </h2>
      </div>

      <Card className="p-6 bg-black/40 backdrop-blur-sm border-2 border-purple-500/30">
        {viewMode === "table" ? (
          <StudentTable
            students={students}
            onEdit={setEditingStudent}
            onDelete={handleDelete}
          />
        ) : (
          <Grid>
            {students.map((student, idx) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card
                  className={cn(
                    "group relative overflow-hidden",
                    "bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-cyan-500/10",
                    "border-2 border-purple-500/20",
                    "hover:border-pink-500/40 hover:shadow-lg hover:shadow-pink-500/20",
                    "transition-all duration-300 ease-out",
                    "backdrop-blur-sm",
                    "hover:scale-[1.02]",
                    "animate-border",
                    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent",
                    "before:via-purple-500/10 before:to-transparent before:opacity-0",
                    "before:transition-opacity before:duration-500 hover:before:opacity-100",
                  )}
                >
                  <div className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 text-sm font-medium">
                        {student.grade} - {student.section}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {student.name}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-300 group-hover:text-purple-200">
                        <Mail className="w-4 h-4 mr-2 text-purple-400" />
                        <span className="text-sm">{student.email}</span>
                      </div>
                      <div className="flex items-center text-gray-300 group-hover:text-purple-200">
                        <GraduationCap className="w-4 h-4 mr-2 text-pink-400" />
                        <span className="text-sm">Grade {student.grade}</span>
                      </div>
                      <div className="flex items-center text-gray-300 group-hover:text-purple-200">
                        <CalendarDays className="w-4 h-4 mr-2 text-cyan-400" />
                        <span className="text-sm">
                          Joined {student.admission_date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-2 p-4 pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingStudent(student)}
                      className="border-purple-500/20 hover:border-purple-500/40 text-purple-400"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </Grid>
        )}
      </Card>
    </motion.div>
  );
};

export default StudentList;
