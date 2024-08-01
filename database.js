const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE clients (id INTEGER PRIMARY KEY, name TEXT, hair_type TEXT, cost REAL)");
});

module.exports = db;