import db from ".";
import type {
  Student,
  Teacher,
  Class,
  Attendance,
  ExamResult,
  Fee,
} from "./schema";

// Student queries
export const getStudents = (): Student[] => {
  return db.prepare("SELECT * FROM students").all();
};

export const getStudentById = (id: number): Student | undefined => {
  return db.prepare("SELECT * FROM students WHERE id = ?").get(id);
};

export const createStudent = (student: Omit<Student, "id">): number => {
  const { lastInsertRowid } = db
    .prepare(
      "INSERT INTO students (name, email, grade, section, admission_date) VALUES (?, ?, ?, ?, ?)",
    )
    .run(
      student.name,
      student.email,
      student.grade,
      student.section,
      student.admission_date,
    );
  return Number(lastInsertRowid);
};

export const updateStudent = (
  id: number,
  student: Partial<Student>,
): boolean => {
  const sets = Object.keys(student)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(student), id];
  const { changes } = db
    .prepare(`UPDATE students SET ${sets} WHERE id = ?`)
    .run(...values);
  return changes > 0;
};

export const deleteStudent = (id: number): boolean => {
  const { changes } = db.prepare("DELETE FROM students WHERE id = ?").run(id);
  return changes > 0;
};

// Teacher queries
export const getTeachers = (): Teacher[] => {
  return db.prepare("SELECT * FROM teachers").all();
};

export const createTeacher = (teacher: Omit<Teacher, "id">): number => {
  const { lastInsertRowid } = db
    .prepare(
      "INSERT INTO teachers (name, email, specialization, join_date) VALUES (?, ?, ?, ?)",
    )
    .run(
      teacher.name,
      teacher.email,
      teacher.specialization,
      teacher.join_date,
    );
  return Number(lastInsertRowid);
};

export const updateTeacher = (
  id: number,
  teacher: Partial<Teacher>,
): boolean => {
  const sets = Object.keys(teacher)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(teacher), id];
  const { changes } = db
    .prepare(`UPDATE teachers SET ${sets} WHERE id = ?`)
    .run(...values);
  return changes > 0;
};

export const deleteTeacher = (id: number): boolean => {
  const { changes } = db.prepare("DELETE FROM teachers WHERE id = ?").run(id);
  return changes > 0;
};

// Class queries
export const getClasses = (): (Class & { teacher_name: string })[] => {
  return db
    .prepare(
      `SELECT c.*, t.name as teacher_name 
       FROM classes c 
       LEFT JOIN teachers t ON c.teacher_id = t.id`,
    )
    .all();
};

export const createClass = (class_: Omit<Class, "id">): number => {
  const { lastInsertRowid } = db
    .prepare(
      "INSERT INTO classes (grade, section, subject, teacher_id) VALUES (?, ?, ?, ?)",
    )
    .run(class_.grade, class_.section, class_.subject, class_.teacher_id);
  return Number(lastInsertRowid);
};

export const updateClass = (id: number, class_: Partial<Class>): boolean => {
  const sets = Object.keys(class_)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(class_), id];
  const { changes } = db
    .prepare(`UPDATE classes SET ${sets} WHERE id = ?`)
    .run(...values);
  return changes > 0;
};

export const deleteClass = (id: number): boolean => {
  const { changes } = db.prepare("DELETE FROM classes WHERE id = ?").run(id);
  return changes > 0;
};

// Attendance queries
export const getAttendance = (date: string): Attendance[] => {
  return db
    .prepare(
      `SELECT a.*, s.name as student_name 
       FROM attendance a 
       LEFT JOIN students s ON a.student_id = s.id 
       WHERE a.date = ?`,
    )
    .all(date);
};

export const createAttendance = (
  attendance: Omit<Attendance, "id">,
): number => {
  const { lastInsertRowid } = db
    .prepare(
      "INSERT INTO attendance (student_id, class_id, date, status) VALUES (?, ?, ?, ?)",
    )
    .run(
      attendance.student_id,
      attendance.class_id,
      attendance.date,
      attendance.status,
    );
  return Number(lastInsertRowid);
};

export const updateAttendance = (
  id: number,
  attendance: Partial<Attendance>,
): boolean => {
  const sets = Object.keys(attendance)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(attendance), id];
  const { changes } = db
    .prepare(`UPDATE attendance SET ${sets} WHERE id = ?`)
    .run(...values);
  return changes > 0;
};

export const deleteAttendance = (id: number): boolean => {
  const { changes } = db.prepare("DELETE FROM attendance WHERE id = ?").run(id);
  return changes > 0;
};

export const updateBulkAttendance = (date: string, status: string): boolean => {
  const { changes } = db
    .prepare("UPDATE attendance SET status = ? WHERE date = ?")
    .run(status, date);
  return changes > 0;
};

// Exam results queries
export const getExamResults = (): ExamResult[] => {
  return db
    .prepare(
      `SELECT e.*, s.name as student_name, c.subject 
       FROM exam_results e 
       LEFT JOIN students s ON e.student_id = s.id 
       LEFT JOIN classes c ON e.class_id = c.id`,
    )
    .all();
};

export const createExamResult = (result: Omit<ExamResult, "id">): number => {
  const { lastInsertRowid } = db
    .prepare(
      "INSERT INTO exam_results (student_id, class_id, exam_date, marks) VALUES (?, ?, ?, ?)",
    )
    .run(result.student_id, result.class_id, result.exam_date, result.marks);
  return Number(lastInsertRowid);
};

export const updateExamResult = (
  id: number,
  result: Partial<ExamResult>,
): boolean => {
  const sets = Object.keys(result)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(result), id];
  const { changes } = db
    .prepare(`UPDATE exam_results SET ${sets} WHERE id = ?`)
    .run(...values);
  return changes > 0;
};

export const deleteExamResult = (id: number): boolean => {
  const { changes } = db
    .prepare("DELETE FROM exam_results WHERE id = ?")
    .run(id);
  return changes > 0;
};

// Fee queries
export const getFees = (): Fee[] => {
  return db
    .prepare(
      `SELECT f.*, s.name as student_name 
       FROM fees f 
       LEFT JOIN students s ON f.student_id = s.id`,
    )
    .all();
};

export const createFee = (fee: Omit<Fee, "id">): number => {
  const { lastInsertRowid } = db
    .prepare(
      "INSERT INTO fees (student_id, amount, due_date, status) VALUES (?, ?, ?, ?)",
    )
    .run(fee.student_id, fee.amount, fee.due_date, fee.status);
  return Number(lastInsertRowid);
};

export const updateFee = (id: number, fee: Partial<Fee>): boolean => {
  const sets = Object.keys(fee)
    .map((key) => `${key} = ?`)
    .join(", ");
  const values = [...Object.values(fee), id];
  const { changes } = db
    .prepare(`UPDATE fees SET ${sets} WHERE id = ?`)
    .run(...values);
  return changes > 0;
};

export const deleteFee = (id: number): boolean => {
  const { changes } = db.prepare("DELETE FROM fees WHERE id = ?").run(id);
  return changes > 0;
};
