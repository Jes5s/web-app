const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Database connected.');
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `);
});

module.exports = db;

router.post('/', (req, res) => {
    const { name, description } = req.body;
    const query = `INSERT INTO items (name, description) VALUES (?, ?)`;
    db.run(query, [name, description], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});