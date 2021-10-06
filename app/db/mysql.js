const mysql = require("mysql");
const CREDENTIALS = require("../config/mysql");

function connection() {
  const connection = mysql.createConnection(CREDENTIALS);
  return connection;
}

function registerUser(data) {
  let mysqlConnection = connection();
  mysqlConnection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL Server!");
  });

  let insert = `INSERT INTO ${process.env.TABLE_USER} SET ?`;
  let query = mysqlConnection.format(insert, data);

  mysqlConnection.query(query, (error, result) => {
    if (error) throw error;
    mysqlConnection.end();
  });
}

module.exports = {
  connection,
  registerUser,
};
