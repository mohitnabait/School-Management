import db from "./db";
import "./seed";

export const initializeDatabase = () => {
  try {
    // Run migrations
    db.exec(`PRAGMA foreign_keys = ON;`);
    console.log("Database initialized successfully");
    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    return false;
  }
};
