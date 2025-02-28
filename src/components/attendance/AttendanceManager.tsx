import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import {
  getAttendance,
  createAttendance,
  updateAttendance,
  updateBulkAttendance,
} from "@/lib/db/queries";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useCustomToast } from "../common/Toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const AttendanceManager = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<any[]>([]);
  const { showSuccess, showError } = useCustomToast();

  useEffect(() => {
    loadAttendance();
  }, [selectedDate]);

  const loadAttendance = () => {
    const data = getAttendance(format(selectedDate, "yyyy-MM-dd"));
    setAttendance(data);
  };

  const handleStatusChange = async (studentId: number, newStatus: string) => {
    try {
      const record = attendance.find((a) => a.student_id === studentId);
      if (record) {
        await updateAttendance(record.id, { status: newStatus });
      } else {
        await createAttendance({
          student_id: studentId,
          class_id: 1, // Default class_id, you might want to make this dynamic
          date: format(selectedDate, "yyyy-MM-dd"),
          status: newStatus,
        });
      }
      loadAttendance();
      showSuccess("Attendance updated successfully");
    } catch (error) {
      showError("Failed to update attendance");
    }
  };

  const handleBulkAction = async (action: string) => {
    try {
      await updateBulkAttendance(format(selectedDate, "yyyy-MM-dd"), action);
      loadAttendance();
      showSuccess("Bulk attendance update successful");
    } catch (error) {
      showError("Failed to update attendance");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-black/40 backdrop-blur-sm border-2 border-purple-500/30">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Attendance Management
            </h2>
            <p className="text-gray-400">Mark and track student attendance</p>
          </div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="rounded-md border"
          />
        </div>

        <div className="flex justify-end space-x-2 mb-4">
          <Button
            variant="outline"
            onClick={() => handleBulkAction("PRESENT")}
            className="border-green-500/20 hover:border-green-500/40 text-green-400"
          >
            Mark All Present
          </Button>
          <Button
            variant="outline"
            onClick={() => handleBulkAction("ABSENT")}
            className="border-red-500/20 hover:border-red-500/40 text-red-400"
          >
            Mark All Absent
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Quick Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendance.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.student_name}</TableCell>
                <TableCell>{record.subject}</TableCell>
                <TableCell>
                  <Select
                    value={record.status}
                    onValueChange={(value) =>
                      handleStatusChange(record.student_id, value)
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        "w-32",
                        record.status === "PRESENT"
                          ? "text-green-400"
                          : record.status === "ABSENT"
                            ? "text-red-400"
                            : "text-yellow-400",
                      )}
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PRESENT">Present</SelectItem>
                      <SelectItem value="ABSENT">Absent</SelectItem>
                      <SelectItem value="LATE">Late</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={record.status === "PRESENT"}
                    onCheckedChange={() =>
                      handleStatusChange(
                        record.student_id,
                        record.status === "PRESENT" ? "ABSENT" : "PRESENT",
                      )
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </motion.div>
  );
};

export default AttendanceManager;
