import express from 'express';
import db from '../db';
const router = express.Router();

router.get('/', (req, res) => {
  const employments = db.prepare('SELECT * FROM employments').all();
  res.json(employments);
});

router.post('/', (req, res) => {
  const {companyname, jobtitle, location, startdate, enddate, description } = req.body;
  if (!companyname || !jobtitle || !location || !startdate) {
    return res.status(400).json({ message: 'Fyll i alla obligatoriska fält!' })
  }

  const query = db.prepare(`
    INSERT INTO employments (companyname, jobtitle, location, startdate, enddate, description)
    VALUES (?, ?, ?, ?, ?, ?)
    `);
    try {
      const result = query.run(companyname, jobtitle, location, startdate, enddate, description);
      res.status(201).json({ id: result.lastInsertRowid, ...req.body })
    } catch (error) {
      res.status(500).json({ message: 'Could not insert employment.' });
    }
});

export default router;