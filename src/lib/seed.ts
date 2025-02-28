import db from "./db";
import { addDays, subDays, format } from "date-fns";

// Seed data
const teachers = [
  {
    name: "John Smith",
    email: "john@school.com",
    specialization: "Mathematics",
  },
  {
    name: "Sarah Johnson",
    email: "sarah@school.com",
    specialization: "English",
  },
  {
    name: "Michael Brown",
    email: "michael@school.com",
    specialization: "Science",
  },
  // Add more teachers...
];

const students = Array.from({ length: 100 }, (_, i) => ({
  name: `Student ${i + 1}`,
  email: `student${i + 1}@school.com`,
  grade: ["9th", "10th", "11th", "12th"][Math.floor(Math.random() * 4)],
  section: ["A", "B", "C"][Math.floor(Math.random() * 3)],
}));

// Insert data
const insertTeacher = db.prepare(`
  INSERT INTO teachers (name, email, specialization, join_date)
  VALUES (@name, @email, @specialization, @join_date)
`);

const insertStudent = db.prepare(`
  INSERT INTO students (name, email, grade, section, admission_date)
  VALUES (@name, @email, @grade, @section, @admission_date)
`);

const insertClass = db.prepare(`
  INSERT INTO classes (grade, section, subject, teacher_id)
  VALUES (@grade, @section, @subject, @teacher_id)
`);

const insertFees = db.prepare(`
  INSERT INTO fees (student_id, amount, due_date, status)
  VALUES (@student_id, @amount, @due_date, @status)
`);

// Seed the database
db.transaction(() => {
  teachers.forEach((teacher) => {
    insertTeacher.run({
      ...teacher,
      join_date: format(
        subDays(new Date(), Math.floor(Math.random() * 365)),
        "yyyy-MM-dd",
      ),
    });
  });

  students.forEach((student) => {
    insertStudent.run({
      ...student,
      admission_date: format(
        subDays(new Date(), Math.floor(Math.random() * 365)),
        "yyyy-MM-dd",
      ),
    });
  });

  // Add classes
  ["9th", "10th", "11th", "12th"].forEach((grade) => {
    ["A", "B", "C"].forEach((section) => {
      ["Mathematics", "English", "Science"].forEach((subject) => {
        insertClass.run({
          grade,
          section,
          subject,
          teacher_id: Math.floor(Math.random() * teachers.length) + 1,
        });
      });
    });
  });

  // Add fees for each student
  for (let i = 1; i <= 100; i++) {
    insertFees.run({
      student_id: i,
      amount: 5000,
      due_date: format(addDays(new Date(), 30), "yyyy-MM-dd"),
      status: Math.random() > 0.3 ? "PAID" : "PENDING",
    });
  }
})();

console.log("Database seeded!");
