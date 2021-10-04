const mysql = require("mysql");

const CREDENTIALS = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
}

const mysqlConnection = mysql.createConnection(CREDENTIALS);
mysqlConnection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});
  
module.exports = mysqlConnection;