const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

// Configurer la base de données MySQL
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

app.use(express.json());

app.get('/data', (req, res) => {
  db.query('SELECT * FROM Users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Servir les fichiers statiques de l'application React
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
