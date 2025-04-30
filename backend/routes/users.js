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
    console.log(typeof result.rows[0].id, result.rows[0].id); // should be "number"
    console.log(typeof result.rows[0].id.toString(), result.rows[0].id.toString()); // should be "string"
    res.json({ _id: result.rows[0].id.toString(), username: result.rows[0].username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error while creating user' });
  }
});

// GET /api/users — get all users
// GET /api/users — get all users
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT id AS _id, username FROM users');
    
    // Log the result to see the raw data being returned
    console.log('Raw data from DB:', result.rows);

    // Ensure the result contains the correct properties
    const users = result.rows.map(row => ({
      _id: row.id,  
      username: row.username
    }));

    // Log the final mapped users data
    console.log('Mapped users data:', users);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error while retrieving users' });
  }
});

module.exports = router;
