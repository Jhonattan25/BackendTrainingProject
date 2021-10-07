const mysql = require("mysql");
const CREDENTIALS = require("../config/mysql");

function connection() {
  const connection = mysql.createConnection(CREDENTIALS);
  return connection;
}

function registerUser(data) {
  const mysqlConnection = connection();
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

function login(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let identificationNumber = data.identificationNumber;
    let select = `SELECT identificationNumber, password FROM ${process.env.TABLE_USER} WHERE identificationNumber=?`;
    let query = mysqlConnection.format(select, [identificationNumber]);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}

function consultDocuments(data){
  return new Promise((resolve, reject)=>{
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let category = data.category;
    let select =  `SELECT * FROM ${process.env.TABLE_DOCUMENT_REPORT} WHERE category=?`;
    let query = mysqlConnection.format(select, [category]);
    
    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}


module.exports = {
  connection,
  registerUser,
  login,
  consultDocuments,
};
