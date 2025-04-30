const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/users — create a new user
router.post('/', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: 'Username is required' });

  try {
    const result = await db.query(
      'INSERT INTO users (username) VALUES ($1) RETURNING id, username',
      [username]
    );
    res.json({ _id: result.rows[0].id, username: result.rows[0].username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error while creating user' });
  }
});

// GET /api/users — get all users
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id AS _id, username FROM users');
    
    // Ensure the result contains the correct properties
    const users = result.rows.map(row => ({
      _id: row._id.toString(),
      username: row.username
    }));

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error while retrieving users' });
  }
});

module.exports = router;
