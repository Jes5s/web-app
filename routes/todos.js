const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ todos: rows });
  });
});

router.post('/', (req, res) => {
  const { name, description } = req.body;
  const dateCreated = new Date().toISOString();
  db.run('INSERT INTO todos (name, description, date_created) VALUES (?, ?, ?)', [name, description, dateCreated], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, name, description, date_created: dateCreated });
  });
});

module.exports = router;