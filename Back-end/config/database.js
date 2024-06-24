const mysql = require('mysql');
const config = require('./config');

const db = mysql.createConnection({
  host: config.DBhost,
  user: config.DBuser,
  password: config.DBpassword,
  database: config.database
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

module.exports = db;