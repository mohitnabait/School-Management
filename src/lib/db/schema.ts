export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  grade: string;
  section: string;
  admission_date: string;
}

export interface Teacher {
  id: number;
  name: string;
  email: string;
  specialization: string;
  join_date: string;
}

export interface Class {
  id: number;
  grade: string;
  section: string;
  subject: string;
  teacher_id: number;
}

export interface Attendance {
  id: number;
  student_id: number;
  class_id: number;
  date: string;
  status: "PRESENT" | "ABSENT" | "LATE";
}

export interface ExamResult {
  id: number;
  student_id: number;
  class_id: number;
  exam_date: string;
  marks: number;
}

export interface Fee {
  id: number;
  student_id: number;
  amount: number;
  due_date: string;
  status: "PAID" | "PENDING" | "OVERDUE";
}
