const itemsModel = require('../models/itemsModel');

exports.getAllItems = (req, res) => {
    itemsModel.getAll((err, rows) => {
        if (err) res.status(500).send('Error fetching items.');
        else res.render('index', { items: rows });
    });
};

exports.createItem = (req, res) => {
    const { name, description } = req.body;
    itemsModel.create({ name, description }, (err) => {
        if (err) res.status(500).send('Error adding item.');
        else res.redirect('/');
    });
};

exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    itemsModel.update(id, { name, description }, (err) => {
        if (err) res.status(500).send('Error updating item.');
        else res.redirect('/');
    });
};

exports.partialUpdateItem = (req, res) => {
    const { id } = req.params;
    itemsModel.partialUpdate(id, req.body, (err) => {
        if (err) res.status(500).send('Error updating item.');
        else res.redirect('/');
    });
};

exports.deleteItem = (req, res) => {
    const { id } = req.params;
    itemsModel.delete(id, (err) => {
        if (err) res.status(500).send('Error deleting item.');
        else res.redirect('/');
    });
};