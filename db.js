const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "g12kwezc",
  database: "pris",
});

module.exports = db;
