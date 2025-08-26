import sqlite3 from 'sqlite3';
import { promisify } from 'util';

// Create SQLite database connection
const db = new sqlite3.Database('./database.sqlite');

// Promisify database methods for async/await
db.run = promisify(db.run).bind(db);
db.get = promisify(db.get).bind(db);
db.all = promisify(db.all).bind(db);

// Create Products table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS Products (
    product_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    discountPrice REAL,
    category TEXT NOT NULL,
    image_url TEXT,
    ingredients TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

db.run(createTableQuery)
  .then(() => {
    console.log('Products table created or already exists');
  })
  .catch((err) => {
    console.error('Error creating Products table:', err);
  });

export default db;
