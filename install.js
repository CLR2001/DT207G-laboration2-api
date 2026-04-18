import Database from 'better-sqlite3';
const db = new Database('employments.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS employments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    companyname TEXT NOT NULL,
    jobtitle TEXT NOT NULL,
    location TEXT NOT NULL,
    startdate DATE NOT NULL,
    enddate DATE,
    description TEXT
  )
`);

console.log('Databas och tabell skapade!');