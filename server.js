const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

app.post('/clients', (req, res) => {
  const { name, hair_type, cost } = req.body;
  db.run('INSERT INTO clients (name, hair_type, cost) VALUES (?, ?, ?)', [name, hair_type, cost], function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(201).send({ id: this.lastID });
  });
});

app.get('/clients', (req, res) => {
  db.all('SELECT * FROM clients', [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(rows);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});