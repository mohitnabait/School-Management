import { mockData } from "./mockData";

// Since we can't use SQLite in the browser, we'll use mock data
export const db = {
  students: mockData.students,
  teachers: mockData.teachers,
  classes: mockData.classes,
  attendance: mockData.attendance,
  examResults: mockData.examResults,
  fees: mockData.fees,
  users: [
    {
      id: 1,
      email: "admin@test.com",
      name: "Admin User",
      role: "admin",
    },
  ],
};

export default db;
