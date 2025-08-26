import mysql from 'mysql2';

const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'appuser',
  password: 'password',
  database: 'User'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL database successfully!');
  
  // Test a simple query
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      console.error('Query error:', err.message);
    } else {
      console.log('Query test successful:', results[0].solution);
    }
    db.end();
  });
});
