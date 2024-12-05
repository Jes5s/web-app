const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) {
      res.status(500).send('Error retrieving to-dos');
    } else {
      res.json(rows);
    }
  });
});

router.post('/', (req, res) => {
  const { name, description } = req.body;
  db.run('INSERT INTO todos (name, description) VALUES (?, ?)', [name, description], function (err) {
    if (err) {
      res.status(500).send('Error adding to-do');
    } else {
      res.status(201).json({ id: this.lastID, name, description });
    }
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.run('UPDATE todos SET name = ?, description = ? WHERE id = ?', [name, description, id], function (err) {
    if (err) {
      res.status(500).send('Error updating to-do');
    } else {
      res.json({ id, name, description });
    }
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).send('Error deleting to-do');
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;