const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db'); // your existing db.js
const usersRouter = require('./routes/users');
const exerciseRouter = require('./routes/exercises');

const app = express();
app.use(cors());
app.use(express.json());



app.use('/api/users', usersRouter);
app.use('/api/users', exerciseRouter);


// Example base route
app.get('/api/test', async (req, res) => {
  res.json({ message: 'API is working!' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
