const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const todoRoutes = require('./routes/todos');

app.use('/todos', todoRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the To-Do List App!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});