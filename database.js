const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('todo.sqlite', (err) => {
    if (err) console.error('Error connecting to database:', err.message);
    else console.log('Connected to SQLite database.');
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task TEXT NOT NULL,
            completed BOOLEAN DEFAULT 0,
            date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

module.exports = db;