import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import pc from "picocolors";

const app = express();
const db = new Database('employments.db');

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  setTimeout(() => {
    console.log("\n-------------------------------------------");
    console.log('  ● Server is running on port 5000!');
    console.log(`  › ${pc.blue(pc.underline('http://localhost:5000'))}`);
    console.log("-------------------------------------------");
  }, 500);
});

app.get('/employments', (req, res) => {
  const employments = db.prepare('SELECT * FROM employments').all();
  res.json(employments);
});