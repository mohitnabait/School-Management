export const ROLES = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const checkUserRole = (userRoles: string[]): UserRole => {
  if (userRoles.includes(ROLES.ADMIN)) return ROLES.ADMIN;
  if (userRoles.includes(ROLES.TEACHER)) return ROLES.TEACHER;
  return ROLES.STUDENT;
};
