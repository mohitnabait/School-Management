import { addDays, subDays, format } from "date-fns";

export const mockData = {
  teachers: [
    {
      id: 1,
      name: "John Smith",
      email: "john@school.com",
      specialization: "Mathematics",
      join_date: "2023-01-15",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@school.com",
      specialization: "English",
      join_date: "2023-02-20",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@school.com",
      specialization: "Science",
      join_date: "2023-03-10",
    },
  ],

  students: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    email: `student${i + 1}@school.com`,
    grade: ["9th", "10th", "11th", "12th"][Math.floor(Math.random() * 4)],
    section: ["A", "B", "C"][Math.floor(Math.random() * 3)],
    admission_date: format(
      subDays(new Date(), Math.floor(Math.random() * 365)),
      "yyyy-MM-dd",
    ),
  })),

  classes: ["9th", "10th", "11th", "12th"].flatMap((grade) =>
    ["A", "B", "C"].flatMap((section) =>
      ["Mathematics", "English", "Science"].map((subject, idx) => ({
        id: idx + 1,
        grade,
        section,
        subject,
        teacher_id: Math.floor(Math.random() * 3) + 1,
      })),
    ),
  ),

  attendance: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    student_id: i + 1,
    student_name: `Student ${i + 1}`,
    class_id: Math.floor(Math.random() * 36) + 1,
    date: format(new Date(), "yyyy-MM-dd"),
    status: Math.random() > 0.1 ? "PRESENT" : "ABSENT",
  })),

  examResults: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    student_id: i + 1,
    student_name: `Student ${i + 1}`,
    class_id: Math.floor(Math.random() * 36) + 1,
    subject: ["Mathematics", "English", "Science"][
      Math.floor(Math.random() * 3)
    ],
    exam_date: format(
      subDays(new Date(), Math.floor(Math.random() * 30)),
      "yyyy-MM-dd",
    ),
    marks: Math.floor(Math.random() * 30) + 70,
  })),

  fees: Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    student_id: i + 1,
    student_name: `Student ${i + 1}`,
    amount: 5000,
    due_date: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    status: Math.random() > 0.3 ? "PAID" : "PENDING",
  })),
};
