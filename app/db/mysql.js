const mysql = require("mysql");
const CREDENTIALS = require("../config/mysql");

function connection() {
  const connection = mysql.createConnection(CREDENTIALS);
  return connection;
}

function consultCities(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let select = `SELECT * FROM ${process.env.TABLE_CITY}`;
    let query = mysqlConnection.format(select);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}

function registerUser(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let insert = `INSERT INTO ${process.env.TABLE_USER} SET ?`;
    let query = mysqlConnection.format(insert, data);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();

      resolve(result);
      setTimeout(resolve, 5000);
    });
  });
}

function activation(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let identificationNumber = data.identificationNumber;
    let select = `update ${process.env.TABLE_USER} SET state = true WHERE identificationNumber=?`;
    let query = mysqlConnection.format(select, [identificationNumber]);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
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
    let select = `SELECT identificationNumber, password, state FROM ${process.env.TABLE_USER} WHERE identificationNumber=?`;
    let query = mysqlConnection.format(select, [identificationNumber]);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
      setTimeout(resolve, 5000);
    });
  });
}

function consultDocuments(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let category = data.category;
    let select = `SELECT d.id, d.documentNumber, d.fullName, d.email, d.description, date_format(d.date, "%d/%m/%Y") AS date, d.category, d.cityCode, c.name AS cityName FROM ${process.env.TABLE_DOCUMENT_REPORT} d INNER JOIN ${process.env.TABLE_CITY} c ON d.cityCode = c.code WHERE d.category=? AND state=1`;
    let query = mysqlConnection.format(select, [category]);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}

function myConsultDocuments(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });
    let identificationNumber = data.identificationNumber;
    let category = data.category;
    let select = `SELECT d.id, d.documentNumber, d.fullName, d.email, d.description, date_format(d.date, "%d/%m/%Y") AS date, d.category, d.cityCode, c.name AS cityName FROM ${process.env.TABLE_DOCUMENT_REPORT} d INNER JOIN ${process.env.TABLE_CITY} c ON d.cityCode = c.code WHERE d.category=? and d.userIdentificationNumber=? AND state=1`;
    let query = mysqlConnection.format(select, [category,identificationNumber]);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}


function myConsultDocumentsFound(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });
    let identificationNumber = data.identificationNumber;
    let category = data.category;
    let select = `SELECT d.id, d.documentNumber, d.fullName, d.email, d.description, date_format(d.date, "%d/%m/%Y") AS date, d.category, d.cityCode, c.name AS cityName FROM ${process.env.TABLE_DOCUMENT_REPORT} d INNER JOIN ${process.env.TABLE_CITY} c ON d.cityCode = c.code WHERE d.category=? and d.userIdentificationNumber=? AND state=1`;
    let query = mysqlConnection.format(select, [category,identificationNumber]);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}

function consultUser(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });
    let identificationNumber = data;
    let select = `SELECT identificationNumber,fullName,email,cityCode FROM ${process.env.TABLE_USER} WHERE identificationNumber=?`;
    let query = mysqlConnection.format(select, [identificationNumber]);
    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}

function updateData(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let identificationNumber = data.identificationNumber;
    let update = `UPDATE ${process.env.TABLE_USER} SET ? WHERE identificationNumber=${identificationNumber}`;
    let query = mysqlConnection.format(update, data);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}

function addDocuments(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let insert = `INSERT INTO ${process.env.TABLE_DOCUMENT_REPORT} SET ?`;
    let query = mysqlConnection.format(insert, data);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
      setTimeout(resolve, 5000);
    });
  });
}

function consultDocument(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let category = data.category;
    let documentNumber = data.documentNumber;
    let select = `SELECT d.id, d.documentNumber, d.fullName, d.email, d.description, date_format(d.date, "%d/%m/%Y") AS date, d.category, d.cityCode, c.name AS cityName FROM ${process.env.TABLE_DOCUMENT_REPORT} d INNER JOIN ${process.env.TABLE_CITY} c ON d.cityCode = c.code WHERE category=? AND documentNumber=? AND state=1`;
    let query = mysqlConnection.format(select, [category, documentNumber]);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}

function consultDocumentType(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let select = `SELECT * FROM ${process.env.TABLE_DOCUMENT_TYPE}`;
    let query = mysqlConnection.format(select);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}

function updateDocument(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let id = data.id;
    let update = `UPDATE ${process.env.TABLE_DOCUMENT_REPORT} SET ? WHERE id=${id}`;
    let query = mysqlConnection.format(update, data);

    mysqlConnection.query(query, (error, result) => {
      if (error) reject(error);
      mysqlConnection.end();
      resolve(result);
    });
  });
}

function deleteDocument(data) {
  return new Promise((resolve, reject) => {
    const mysqlConnection = connection();
    mysqlConnection.connect((err) => {
      if (err) throw err;
      console.log("Connected to MySQL Server!");
    });

    let id = data.id;
    let deleteDocument = `UPDATE ${process.env.TABLE_DOCUMENT_REPORT} SET state = 0 WHERE id=${id}`;
    let query = mysqlConnection.format(deleteDocument);

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
  addDocuments,
  activation,
  updateData,
  consultUser,
  consultCities,
  consultDocument,
  consultDocumentType,
  updateDocument,
  deleteDocument,
  myConsultDocuments,
  myConsultDocumentsFound,
};
