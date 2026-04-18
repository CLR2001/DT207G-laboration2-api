import Database from 'better-sqlite3';
import pc from "picocolors";

const dbPath = '/app/data/employments.db'
const path = process.env.NODE_ENV === 'production' ?  dbPath : '.' + dbPath;

const db = new Database(path);

db.exec(`
  CREATE TABLE IF NOT EXISTS employments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    companyname TEXT NOT NULL,
    jobtitle TEXT NOT NULL,
    location TEXT NOT NULL,
    startdate DATE NOT NULL,
    enddate DATE,
    description TEXT DEFAULT 'Ingen beskrivning tillgänglig'
  )
`);

console.log("\n--------------------------------------------------");
console.log(`  ${pc.green('ℹ')} Database and table initialized successfully.`);
console.log("--------------------------------------------------");

export default db;