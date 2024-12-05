const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const todosRoutes = require('./routes/todos');
app.use('/api/todos', todosRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});