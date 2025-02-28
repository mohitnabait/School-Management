import db from ".";

export const runTransaction = <T>(callback: () => T): T => {
  try {
    db.prepare("BEGIN").run();
    const result = callback();
    db.prepare("COMMIT").run();
    return result;
  } catch (error) {
    db.prepare("ROLLBACK").run();
    throw error;
  }
};

export const sanitizeInput = (input: string): string => {
  return input.replace(/[\\"']/g, "");
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};
