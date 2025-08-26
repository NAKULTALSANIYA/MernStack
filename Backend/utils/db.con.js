import mysql from 'mysql2'

const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'appuser',
  password: 'password',
  database: 'User'
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err)
    return
  }
  console.log(`Connected to MySQL database`)
})

export default db