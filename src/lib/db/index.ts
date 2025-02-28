import Database from "better-sqlite3";
import { join } from "path";
import { readFileSync } from "fs";

// Initialize database
const db = new Database(join(process.cwd(), "school.db"));

// Run migrations
const migrations = readFileSync(join(__dirname, "migrations.sql"), "utf8");
db.exec(migrations);

export default db;
