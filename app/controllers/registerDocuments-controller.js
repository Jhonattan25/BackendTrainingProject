const mysqlConnection = require("../config/mysql");

let registerDocuments = (req, res) => {
  let insert = `INSERT INTO ${process.env.TABLE_DOCUMENT_REPORT} SET ?`;
  let query = mysqlConnection.format(insert, req.body);
  mysqlConnection.query(query, (error, result) => {
    if (error) throw error;
    return res.status(200).json({
      status: "Successful register documents",
      reg: true,
    });
  });
};

module.exports = {
  registerDocuments,
};
