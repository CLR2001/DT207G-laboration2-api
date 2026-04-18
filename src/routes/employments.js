import express from 'express';
import db from '../db';
const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                     GET                                    */
/* -------------------------------------------------------------------------- */
router.get('/', (req, res) => {
  const employments = db.prepare('SELECT * FROM employments').all();
  res.json(employments);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const fetch = db.prepare('SELECT * FROM employments WHERE id = ?').get(id);

    if (!fetch) {
      return res.status(404).json({
        error: 'Not found',
        message: `Employment with ID ${id} not found`
      });
    }

    res.json(fetch);

  } catch (error) {
    res.status(500).json({ 
      error: 'Internal error',
      message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */
router.post('/', (req, res) => {
  const {company_name, job_title, location, start_date } = req.body;

  const end_date = req.body.end_date?.trim() || null;
  const description = req.body.description?.trim() || 'Ingen beskrivning tillgänglig';

  if (!company_name?.trim() || !job_title?.trim() || !location?.trim() || !start_date?.trim()) {
    return res.status(400).json({ 
      error: 'Missing data',
      message: 'Missing mandatory inputs' })
  }

  const insert = db.prepare(`
    INSERT INTO employments (
      company_name, 
      job_title, 
      location, 
      start_date, 
      end_date, 
      description
    ) VALUES (?, ?, ?, ?, ?, ?)
  `);

  try {
    const result = insert.run(
      company_name.trim(), 
      job_title.trim(), 
      location.trim(), 
      start_date.trim(), 
      end_date,
      description
    );

    res.status(201).json({ id: result.lastInsertRowid, ...req.body })
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal error',
      message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/*                                     PUT                                    */
/* -------------------------------------------------------------------------- */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { company_name, job_title, location, start_date } = req.body;

  const end_date = req.body.end_date?.trim() || null;
  const description = req.body.description?.trim() || 'Ingen beskrivning tillgänglig';
  
  if (!company_name?.trim() || !job_title?.trim() || !location?.trim() || !start_date?.trim()) {
    return res.status(400).json({ 
      error: 'Missing data',
      message: 'Missing mandatory inputs' })
  }

  try {
    const query = db.prepare(`
      UPDATE employments SET 
        company_name = ?, 
        job_title = ?, 
        location = ?, 
        start_date = ?, 
        end_date = ?, 
        description = ?
      WHERE id = ?
    `);

    const result = query.run(
      company_name.trim(), 
      job_title.trim(), 
      location.trim(), 
      start_date.trim(), 
      end_date, 
      description,
      id
    );

    if (result.changes === 0) {
      return res.status(404).json({ 
        error: 'Not found',
        message: `Employment with ID ${id} not found` });
    }

    res.json({ message: 'Update successful' });

  } catch (error) {
    res.status(500).json({ 
      error: 'Internal error', 
      message: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */
router.delete('/:id', (req, res) => {
  const  { id } = req.params;
  
  try {
    const exists = db.prepare('SELECT id FROM employments WHERE id = ?').get(id);
    
    if (!exists) {
      return res.status(404).json({
        error: 'Not found',
        message: `Employment with ID ${id} not found`
      });
    }

    db.prepare('DELETE FROM employments WHERE id = ?').run(id);

    res.status(200).json({
      message: `Employment with ID ${id} successfully deleted`,
      id: id
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal error',
      message: error.message })
  }
})

export default router;