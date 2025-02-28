import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Grid } from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import {
  getTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
} from "@/lib/db/queries";
import { cn } from "@/lib/utils";
import {
  User2,
  Mail,
  BookOpen,
  CalendarDays,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import DataForm from "../common/DataForm";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { useCustomToast } from "../common/Toast";
import type { Teacher } from "@/lib/db/schema";

const TeacherList = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    id?: number;
  }>({ show: false });
  const { showSuccess, showError } = useCustomToast();

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = () => {
    const data = getTeachers();
    setTeachers(data);
  };

  const handleCreate = async (data: Omit<Teacher, "id">) => {
    try {
      await createTeacher(data);
      loadTeachers();
      setShowForm(false);
      showSuccess("Teacher created successfully");
    } catch (error) {
      showError("Failed to create teacher");
    }
  };

  const handleUpdate = async (data: Partial<Teacher>) => {
    if (!editingTeacher?.id) return;
    try {
      await updateTeacher(editingTeacher.id, data);
      loadTeachers();
      setEditingTeacher(null);
      showSuccess("Teacher updated successfully");
    } catch (error) {
      showError("Failed to update teacher");
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.id) return;
    try {
      await deleteTeacher(deleteConfirm.id);
      loadTeachers();
      setDeleteConfirm({ show: false });
      showSuccess("Teacher deleted successfully");
    } catch (error) {
      showError("Failed to delete teacher");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      {showForm && (
        <div className="mb-6">
          <DataForm
            title="Teacher"
            fields={[
              { name: "name", label: "Name", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              {
                name: "specialization",
                label: "Specialization",
                type: "text",
                required: true,
              },
              {
                name: "join_date",
                label: "Join Date",
                type: "date",
                required: true,
              },
            ]}
            onSubmit={handleCreate}
          />
        </div>
      )}

      {editingTeacher && (
        <div className="mb-6">
          <DataForm
            title="Teacher"
            fields={[
              { name: "name", label: "Name", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              {
                name: "specialization",
                label: "Specialization",
                type: "text",
                required: true,
              },
            ]}
            onSubmit={handleUpdate}
            initialData={editingTeacher}
            isEdit
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Teachers Directory
        </h2>
      </div>

      <Grid>
        {teachers.map((teacher, idx) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card
              className={cn(
                "group relative overflow-hidden",
                "bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10",
                "border-2 border-cyan-500/20",
                "hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/20",
                "transition-all duration-300 ease-out",
                "backdrop-blur-sm",
                "hover:scale-[1.02]",
                "animate-border",
              )}
            >
              <div className="p-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300">
                    <User2 className="w-6 h-6" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-200 text-sm font-medium">
                    {teacher.specialization}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {teacher.name}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-300 group-hover:text-cyan-200">
                    <Mail className="w-4 h-4 mr-2 text-cyan-400" />
                    <span className="text-sm">{teacher.email}</span>
                  </div>
                  <div className="flex items-center text-gray-300 group-hover:text-cyan-200">
                    <BookOpen className="w-4 h-4 mr-2 text-blue-400" />
                    <span className="text-sm">{teacher.specialization}</span>
                  </div>
                  <div className="flex items-center text-gray-300 group-hover:text-cyan-200">
                    <CalendarDays className="w-4 h-4 mr-2 text-purple-400" />
                    <span className="text-sm">Joined {teacher.join_date}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingTeacher(teacher)}
                    className="border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      setDeleteConfirm({ show: true, id: teacher.id })
                    }
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </Grid>

      <ConfirmDialog
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false })}
        onConfirm={handleDelete}
        title="Delete Teacher"
        description="Are you sure you want to delete this teacher? This action cannot be undone."
      />
    </motion.div>
  );
};

export default TeacherList;
