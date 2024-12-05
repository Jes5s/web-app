const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// Routes for CRUD operations
router.get('/', itemsController.getAllItems);
router.post('/', itemsController.createItem);
router.put('/:id', itemsController.updateItem);
router.patch('/:id', itemsController.partialUpdateItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;