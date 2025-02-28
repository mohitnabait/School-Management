import React, { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { ConfirmDialog } from "../common/ConfirmDialog";
import { useCustomToast } from "../common/Toast";
import { Student } from "@/lib/db/schema";
import { ColumnDef } from "@tanstack/react-table";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onView?: (student: Student) => void;
}

const StudentTable = ({
  students,
  onEdit,
  onDelete,
  onView,
}: StudentTableProps) => {
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    id?: number;
  }>({ show: false });
  const { showSuccess } = useCustomToast();

  const handleDelete = () => {
    if (!deleteConfirm.id) return;
    onDelete(deleteConfirm.id);
    setDeleteConfirm({ show: false });
    showSuccess("Student deleted successfully");
  };

  const columns: ColumnDef<Student>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "grade",
      header: "Grade",
    },
    {
      accessorKey: "section",
      header: "Section",
    },
    {
      accessorKey: "admission_date",
      header: "Admission Date",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex items-center space-x-2">
            {onView && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(student)}
                className="border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 h-8 w-8 p-0"
              >
                <Eye className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(student)}
              className="border-purple-500/20 hover:border-purple-500/40 text-purple-400 h-8 w-8 p-0"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeleteConfirm({ show: true, id: student.id })}
              className="border-red-500/20 hover:border-red-500/40 text-red-400 h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={students}
        searchColumn="name"
        searchPlaceholder="Search students..."
      />

      <ConfirmDialog
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false })}
        onConfirm={handleDelete}
        title="Delete Student"
        description="Are you sure you want to delete this student? This action cannot be undone."
      />
    </>
  );
};

export default StudentTable;
