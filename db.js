const mysql = require("mysql");

const db = mysql.createConnection({
  host: 'sc-database-service',
  port: 3306,
  user: 'root',
  password: 'qwerty',
  database: 'sc_db',
  dateStrings: "date",
});

db.connect();

module.exports = db;