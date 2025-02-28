import { db } from "./db";

export const getStudents = () => db.students;

export const getTeachers = () => db.teachers;

export const getClasses = () => {
  return db.classes.map((class_) => ({
    ...class_,
    teacher_name:
      db.teachers.find((t) => t.id === class_.teacher_id)?.name || "Unknown",
  }));
};

export const getFees = () => db.fees;

export const getAttendance = (date: string) => {
  return db.attendance.filter((a) => a.date === date);
};

export const getExamResults = () => db.examResults;

export const updateAttendance = (id: number, status: string) => {
  const index = db.attendance.findIndex((a) => a.id === id);
  if (index !== -1) {
    db.attendance[index].status = status;
  }
};

export const updateExamResult = (id: number, marks: number) => {
  const index = db.examResults.findIndex((e) => e.id === id);
  if (index !== -1) {
    db.examResults[index].marks = marks;
  }
};

export const updateFeeStatus = (id: number, status: string) => {
  const index = db.fees.findIndex((f) => f.id === id);
  if (index !== -1) {
    db.fees[index].status = status;
  }
};

export const deleteStudent = (id: number) => {
  const index = db.students.findIndex((s) => s.id === id);
  if (index !== -1) {
    db.students.splice(index, 1);
  }
};

export const deleteTeacher = (id: number) => {
  const index = db.teachers.findIndex((t) => t.id === id);
  if (index !== -1) {
    db.teachers.splice(index, 1);
  }
};

export const deleteClass = (id: number) => {
  const index = db.classes.findIndex((c) => c.id === id);
  if (index !== -1) {
    db.classes.splice(index, 1);
  }
};

export const addStudent = (student: any) => {
  const newId = Math.max(...db.students.map((s) => s.id)) + 1;
  db.students.push({ ...student, id: newId });
};

export const addTeacher = (teacher: any) => {
  const newId = Math.max(...db.teachers.map((t) => t.id)) + 1;
  db.teachers.push({ ...teacher, id: newId });
};

export const addExamResult = (result: any) => {
  const newId = Math.max(...db.examResults.map((e) => e.id)) + 1;
  db.examResults.push({ ...result, id: newId });
};

export const addFee = (fee: any) => {
  const newId = Math.max(...db.fees.map((f) => f.id)) + 1;
  db.fees.push({ ...fee, id: newId });
};

export const getUser = (email: string) => {
  return db.users.find((u) => u.email === email);
};
