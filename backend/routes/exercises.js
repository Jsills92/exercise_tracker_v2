const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/users/:_id/exercises - Add an exercise to a user
router.post('/:_id/exercises', async (req, res) => {
  const userId = req.params.id;
  const { description, duration, date } = req.body;

  if (!description || !duration) {
    return res.status(400).json({ error: 'Description and duration are required' });
  }

  const exerciseDate = date ? new Date(date) : new Date();

  try {
    // Check if user exists
    const userCheck = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Insert exercise
    const result = await db.query(
      `INSERT INTO exercises (user_id, description, duration, date)
       VALUES ($1, $2, $3, $4)
       RETURNING description, duration, date`,
      [userId, description, duration, exerciseDate]
    );

    res.json({
      _id: userId,
      username: userCheck.rows[0].username,
      description: result.rows[0].description,
      duration: result.rows[0].duration,
      date: new Date(result.rows[0].date).toDateString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error while creating exercise' });
  }
});

// GET /api/users/:id/logs - Get user's exercise log
router.get('/:_id/logs', async (req, res) => {
  const userId = req.params.id;
  const { from, to, limit } = req.query;

  try {
    const userCheck = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    let query = 'SELECT description, duration, date FROM exercises WHERE user_id = $1';
    const values = [userId];

    if (from) {
      query += ' AND date >= $' + (values.length + 1);
      values.push(from);
    }

    if (to) {
      query += ' AND date <= $' + (values.length + 1);
      values.push(to);
    }

    query += ' ORDER BY date DESC';

    if (limit) {
      query += ' LIMIT $' + (values.length + 1);
      values.push(limit);
    }

    const result = await db.query(query, values);

    const log = result.rows.map(row => ({
      description: row.description,
      duration: row.duration,
      date: new Date(row.date).toDateString()
    }));

    res.json({
      _id: userId,
      username: userCheck.rows[0].username,
      count: log.length,
      log
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error while retrieving exercise log' });
  }
});

module.exports = router;
