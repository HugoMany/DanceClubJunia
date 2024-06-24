const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'admin123',
  password: 'admin123',
  database: 'requests'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

module.exports = db;