import mysql from 'mysql2';

// Create connection to MySQL server
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL server');
  
  // Create database if it doesn't exist
  connection.query('CREATE DATABASE IF NOT EXISTS User', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      connection.end();
      return;
    }
    console.log('Database "User" created or already exists');
    
    // Switch to the database
    connection.query('USE User', (err) => {
      if (err) {
        console.error('Error switching to database:', err);
        connection.end();
        return;
      }
      
      // Create Products table
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Products (
          product_id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(50) NOT NULL,
          description TEXT NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          discountPrice DECIMAL(10, 2),
          category VARCHAR(50) NOT NULL,
          image_url VARCHAR(255),
          ingredients JSON,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `;
      
      connection.query(createTableQuery, (err) => {
        if (err) {
          console.error('Error creating Products table:', err);
        } else {
          console.log('Products table created or already exists');
        }
        connection.end();
      });
    });
  });
});
