import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Grid } from "@/components/ui/grid";
import { Button } from "@/components/ui/button";
import {
  getClasses,
  getTeachers,
  createClass,
  updateClass,
  deleteClass,
} from "@/lib/db/queries";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  Users,
  BookOpen,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import DataForm from "../common/DataForm";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { useCustomToast } from "../common/Toast";
import type { Class } from "@/lib/db/schema";

const ClassList = () => {
  const [classes, setClasses] = useState<(Class & { teacher_name: string })[]>(
    [],
  );
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    id?: number;
  }>({ show: false });
  const { showSuccess, showError } = useCustomToast();
  const teachers = getTeachers();

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = () => {
    const data = getClasses();
    setClasses(data);
  };

  const handleCreate = async (data: Omit<Class, "id">) => {
    try {
      await createClass(data);
      loadClasses();
      setShowForm(false);
      showSuccess("Class created successfully");
    } catch (error) {
      showError("Failed to create class");
    }
  };

  const handleUpdate = async (data: Partial<Class>) => {
    if (!editingClass?.id) return;
    try {
      await updateClass(editingClass.id, data);
      loadClasses();
      setEditingClass(null);
      showSuccess("Class updated successfully");
    } catch (error) {
      showError("Failed to update class");
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.id) return;
    try {
      await deleteClass(deleteConfirm.id);
      loadClasses();
      setDeleteConfirm({ show: false });
      showSuccess("Class deleted successfully");
    } catch (error) {
      showError("Failed to delete class");
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
          className="bg-gradient-to-r from-emerald-500 to-green-500 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Class
        </Button>
      </div>

      {showForm && (
        <div className="mb-6">
          <DataForm
            title="Class"
            fields={[
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
                name: "subject",
                label: "Subject",
                type: "text",
                required: true,
              },
              {
                name: "teacher_id",
                label: "Teacher",
                type: "select",
                required: true,
                options: teachers.map((t) => ({
                  value: t.id.toString(),
                  label: t.name,
                })),
              },
            ]}
            onSubmit={handleCreate}
          />
        </div>
      )}

      {editingClass && (
        <div className="mb-6">
          <DataForm
            title="Class"
            fields={[
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
                name: "subject",
                label: "Subject",
                type: "text",
                required: true,
              },
              {
                name: "teacher_id",
                label: "Teacher",
                type: "select",
                required: true,
                options: teachers.map((t) => ({
                  value: t.id.toString(),
                  label: t.name,
                })),
              },
            ]}
            onSubmit={handleUpdate}
            initialData={editingClass}
            isEdit
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
          Classes
        </h2>
      </div>

      <Grid>
        {classes.map((class_, idx) => (
          <motion.div
            key={class_.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
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
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-200 text-sm font-medium">
                    {class_.grade} - {class_.section}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {class_.subject}
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-300 group-hover:text-emerald-200">
                    <Users className="w-4 h-4 mr-2 text-emerald-400" />
                    <span className="text-sm">{class_.teacher_name}</span>
                  </div>
                  <div className="flex items-center text-gray-300 group-hover:text-emerald-200">
                    <BookOpen className="w-4 h-4 mr-2 text-green-400" />
                    <span className="text-sm">{class_.subject}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingClass(class_)}
                    className="border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400"
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      setDeleteConfirm({ show: true, id: class_.id })
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
        title="Delete Class"
        description="Are you sure you want to delete this class? This action cannot be undone."
      />
    </motion.div>
  );
};

export default ClassList;
