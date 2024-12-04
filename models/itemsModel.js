const db = require('../database');

exports.getAll = (callback) => {
    db.all('SELECT * FROM items', [], callback);
};

exports.create = (item, callback) => {
    const { name, description } = item;
    db.run(
        'INSERT INTO items (name, description) VALUES (?, ?)',
        [name, description],
        callback
    );
};

exports.update = (id, item, callback) => {
    const { name, description } = item;
    db.run(
        'UPDATE items SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
        callback
    );
};

exports.partialUpdate = (id, fields, callback) => {
    const updates = Object.keys(fields)
        .map((key) => `${key} = ?`)
        .join(', ');
    const values = Object.values(fields).concat(id);
    db.run(`UPDATE items SET ${updates} WHERE id = ?`, values, callback);
};

exports.delete = (id, callback) => {
    db.run('DELETE FROM items WHERE id = ?', [id], callback);
};