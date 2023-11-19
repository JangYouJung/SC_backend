const mysql = require("mysql");

const db = mysql.createConnection({
  host: $DB_HOST,
  port: $DB_PORT,
  user: $DB_USER,
  password: $DB_PASSWORD,
  database: $DB_NAME,
  dateStrings: "date",
});

db.connect();

module.exports = db;