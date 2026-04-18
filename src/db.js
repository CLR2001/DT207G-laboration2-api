import Database from 'better-sqlite3';
import pc from "picocolors";

const dbPath = '/app/data/employments.db'
const path = process.env.NODE_ENV === 'production' ?  dbPath : '.' + dbPath;

const db = new Database(path);

db.exec(`
  CREATE TABLE IF NOT EXISTS employments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    job_title TEXT NOT NULL,
    location TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE DEFAULT NULL,
    description TEXT DEFAULT 'Ingen beskrivning tillgänglig'
  )
`);

console.log("\n--------------------------------------------------");
console.log(`  ${pc.green('ℹ')} Database and table initialized successfully.`);
console.log("--------------------------------------------------");

export default db;